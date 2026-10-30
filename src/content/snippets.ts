import type { Snippet } from "./schema";

/**
 * Sanitized code excerpts from PRIVATE repositories.
 *
 * Source: Autoria em Forma project audit (29/10/2026). Each excerpt was cleaned
 * there (no secrets, internal references or real thesis content) and re-checked
 * here. tests/content.test.ts scans these for secrets/internal terms.
 *
 * Code is stored with String.raw so regex backslashes are kept verbatim.
 */
export const snippets = [
  {
    id: "aef-quote-integrity",
    title: {
      en: "Quotation and research-data integrity",
      pt: "Integridade das citações e dos dados de pesquisa",
    },
    language: "python",
    file: "pipeline/proteger_trechos.py + testes/verificar_hashes.py",
    code: String.raw`# pipeline/proteger_trechos.py: runs on the ORIGINAL, before any change
# Short quotation: text in quotes followed by a citation with year and page
CITACAO_CURTA = re.compile(r'"([^"]{10,}?)"\s{0,3}(?=\([^()]*\d{4}[a-z]?[^()]*p\.)')

def h(texto: str) -> str:
    return hashlib.sha256(normalizar(texto).encode("utf-8")).hexdigest()

def extrair(caminho: str) -> list[dict]:
    partes = abrir(caminho)                      # safe reading (next excerpt)
    estilos = mapa_estilos(partes)
    trechos: list[dict] = []

    def add(tipo: str, texto: str, origem: str) -> None:
        t = normalizar(texto)
        if len(t) >= 3:
            trechos.append({"id": f"T{len(trechos) + 1:03d}", "tipo": tipo,
                            "origem": origem, "texto": t, "sha256": h(t)})

    for i, el in enumerate(corpo(partes)):
        # ... tables and passages after a marker (e.g. appendix transcripts) are also added
        txt = texto_paragrafo(el, "original")
        estilo = nome_estilo(el, estilos).lower()
        if recuo_esquerdo(el, estilos) >= RECUO_CITACAO_LONGA or "cita" in estilo or "quote" in estilo:
            add("citacao-longa", txt, f"parágrafo {i}")
            continue
        for m in CITACAO_CURTA.finditer(normalizar(txt)):
            add("citacao-curta", m.group(1), f"parágrafo {i}")
    return trechos

# testes/verificar_hashes.py: runs on the FINAL version (changes accepted)
SIC = re.compile(r"\s?\[sic\]", re.IGNORECASE)   # [sic] is the only insertion allowed

def tirar_sic(t: str) -> str:
    return normalizar(SIC.sub("", t))

def main() -> int:
    dados = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    texto, tabelas = texto_final(sys.argv[2])
    alterados = [t for t in dados["trechos"]
                 if tirar_sic(t["texto"]) not in (tabelas if t["tipo"] == "tabela" else texto)]
    if alterados:
        print("FALHOU: trecho protegido alterado ou ausente. Entrega bloqueada.")
        return 1                                 # exit code 1 blocks the delivery
    return 0`,
    explanation: {
      en: "Before any edit, the pipeline extracts direct quotations (long ones by indentation or style, short ones by quotes plus a page citation) and data tables from the original file, storing each one's normalized text and SHA-256. At the end, the test requires every protected passage to appear unchanged in the final version, with \"[sic]\" as the only allowed insertion. This prevents the AI or the reviewer from \"fixing\" a quotation or research data that must stay exactly as in the source.",
      pt: "Antes de qualquer correção, o pipeline extrai do arquivo original as citações diretas (longas, pelo recuo ou pelo estilo; curtas, entre aspas com chamada e página) e as tabelas de dados, registrando o texto normalizado e um SHA-256 de cada uma. No fim, o teste exige que cada trecho apareça idêntico na versão final; a única inserção aceita é \"[sic]\". Isso impede que a IA ou o revisor \"corrija\" uma citação ou um dado de pesquisa, que precisam ficar exatamente como no original.",
    },
    fidelity: {
      en: "Two files joined and simplified: table handling and some options cut (marked # ...), the loop rewritten as an equivalent comprehension, argument validation omitted, comments translated to English. The comparison logic is the same as the real code.",
      pt: "Dois arquivos unidos e simplificados: tratamento de tabelas e algumas opções cortados (marcados com # ...), o laço reescrito como comprehension equivalente, validação de argumentos omitida, comentários traduzidos para o inglês. A lógica de comparação é a mesma do código real.",
    },
  },
  {
    id: "aef-safe-docx",
    title: { en: "Safe .docx reading", pt: "Leitura segura do .docx" },
    language: "python",
    file: "pipeline/docx_seguro.py",
    code: String.raw`import zipfile
from pathlib import Path
from lxml import etree

LIMITE_TOTAL = 300 * 1024 * 1024   # 300 MB uncompressed
LIMITE_PARTE = 100 * 1024 * 1024   # 100 MB per part
LIMITE_TAXA = 200                   # compression above 200:1 is suspicious

# XML parser without DTD, external entities or network (XXE protection)
PARSER = etree.XMLParser(
    resolve_entities=False, no_network=True, load_dtd=False, dtd_validation=False, huge_tree=False
)

class ArquivoRecusado(Exception):
    pass

def abrir(caminho: str | Path) -> dict[str, bytes]:
    """Reads the whole package in memory. Raises ArquivoRecusado if unsafe."""
    caminho = Path(caminho)
    if caminho.suffix.lower() != ".docx":
        raise ArquivoRecusado(f"{caminho.name}: só .docx é aceito.")
    with zipfile.ZipFile(caminho) as z:
        total = 0
        for info in z.infolist():                          # check BEFORE decompressing
            if info.file_size > LIMITE_PARTE:
                raise ArquivoRecusado(f"{info.filename}: parte grande demais.")
            if info.compress_size and info.file_size / info.compress_size > LIMITE_TAXA \
                    and info.file_size > 1_000_000:
                raise ArquivoRecusado(f"{info.filename}: taxa de compressão suspeita (zip bomb).")
            total += info.file_size
            if total > LIMITE_TOTAL:
                raise ArquivoRecusado("Pacote descompactado passa do limite (zip bomb).")
            if info.filename.lower().endswith("vbaproject.bin"):
                raise ArquivoRecusado("Arquivo com macro (vbaProject.bin).")
        partes = {info.filename: z.read(info.filename) for info in z.infolist()}
    if b"macroEnabled" in partes.get("[Content_Types].xml", b""):
        raise ArquivoRecusado("Content type de documento com macro.")
    return partes

def xml(dados: bytes) -> etree._Element:
    return etree.fromstring(dados, PARSER)                 # every XML goes through the safe parser`,
    explanation: {
      en: "The pipeline's single entry point for files: every script opens .docx files through it. Before decompressing, it checks each part's size, the total size and the compression ratio (against zip bombs), and rejects macro-enabled files by extension, VBA binary and content type. All XML is parsed with no DTD, no external entities and no network access, which blocks XXE attacks.",
      pt: "É a única porta de entrada de arquivos do pipeline: todos os scripts abrem o .docx por aqui. Antes de descompactar, a função confere o tamanho de cada parte, o total e a taxa de compressão (contra zip bomb), e recusa arquivos com macro, pela extensão, pelo binário VBA e pelo content type. Todo XML é lido com um parser sem DTD, sem entidades externas e sem rede, o que bloqueia ataques XXE.",
    },
    fidelity: {
      en: "Same as the real code, except that references to internal documents were removed from error messages and the docstring, one long line was wrapped, and comments were translated to English.",
      pt: "Igual ao código real, exceto pela remoção de referências a documentos internos nas mensagens de erro e na docstring, por uma linha longa quebrada e pelos comentários traduzidos para o inglês.",
    },
  },
  {
    id: "aef-regression",
    title: {
      en: "Regression test: real error → rule → test",
      pt: "Teste de regressão: erro real → regra → teste",
    },
    language: "python",
    file: "testes/autoteste/rodar.py",
    code: String.raw`def rodar(script, *args, esperado: int, contem=None, nome: str = "") -> str:
    """Runs a pipeline script and checks the expected exit code and message."""
    proc = subprocess.run(PY + [str(RAIZ / script), *map(str, args)],
                          capture_output=True, text=True, timeout=600)
    saida = proc.stdout + proc.stderr
    ok = proc.returncode == esperado and all(c in saida for c in (contem or []))
    resultados.append((ok, nome or script))
    # ... failure details printed here
    return saida

# Real error E1: a date was changed inside a direct quotation.
# Permanent rule: quoted text is untouchable.
# Test: 100% fictional documents, generated by a script on every run.
#   limpa.docx      -> quotation preserved      -> the test must PASS
#   limpa_ruim.docx -> date changed in quotation -> the test must FAIL
# Illustrative example: "Exemplo de citação longa [...] no século XIX. (SOBRENOME, 2020, p. 10)."
rodar("testes/verificar_hashes.py", j, d / "limpa.docx", esperado=0,
      nome="verificar_hashes aprova trechos intactos")
rodar("testes/verificar_hashes.py", j, d / "limpa_ruim.docx", esperado=1,
      contem=["citacao-longa"], nome="verificar_hashes pega data trocada na citação (E1)")`,
    explanation: {
      en: "Every real mistake becomes a rule and, when it can be automated, a pair of tests: a correct document that must pass and one that reproduces the mistake and must fail. The suite generates fictional documents on every run and is executed before any job, so a script change that lets the mistake slip through again is caught before any file is delivered.",
      pt: "Cada erro real vira uma regra e, quando dá para automatizar, um par de testes: um documento correto, que precisa passar, e um que reproduz o erro, que precisa falhar. A suíte gera documentos fictícios a cada execução e roda antes de qualquer trabalho; se um script mudar e deixar o erro passar de novo, a suíte acusa antes que um arquivo seja entregue.",
    },
    fidelity: {
      en: "The function and both calls match the real code (failure printing cut, docstring translated to English). The E1 comments and the illustrative example were written for this page; the fixture generator is not shown.",
      pt: "A função e as duas chamadas são iguais ao código real (impressão de falha cortada, docstring traduzida para o inglês). Os comentários sobre o E1 e o exemplo ilustrativo foram escritos para esta página; o gerador de documentos fictícios não é mostrado.",
    },
  },
] satisfies Snippet[];
