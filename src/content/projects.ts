import type { Project } from "./schema";

/**
 * Projects, in display order.
 *
 * Rules (docs/SOURCES.md):
 * - Only things that exist and can be checked. No idea/deck-only projects.
 * - Every project lists its limitations.
 * - Autoria em Forma: launched Oct/2026, paused after a demand test without
 *   organic traction; 2 complete jobs delivered (Oct and Nov 2026). No clients, sales or revenue.
 *   No internal links and no real TCC content anywhere (see SOURCES.md).
 * - Support agent: rules + LLM triage prototype. Every number on the card comes from
 *   `results/eval_results.json` and the README (section 8) of its repository, merged
 *   on 10/11/2026 (repository PRs #2 to #7). Limitations come from the same README (Part 23, ADR-036).
 */
export const projects = [
  {
    slug: "autoria-em-forma",
    name: "Autoria em Forma",
    featured: true,
    status: "paused",
    // Lead with what was delivered; "paused" stays in the badge and once here (Part 16).
    statusNote: {
      en: "2 complete jobs delivered (Oct and Nov 2026) · paused after a demand test without organic traction",
      pt: "2 trabalhos completos entregues (out e nov/2026) · pausado após teste de demanda sem tração orgânica",
    },
    summary: {
      en: "ABNT formatting and text revision service for undergraduate theses, with an AI pipeline whose deliveries are gated by automated checks.",
      pt: "Serviço de formatação ABNT e revisão textual de TCC, com um pipeline de IA em que as entregas passam por verificações automáticas.",
    },
    scope: {
      en: "Formatting and revision only: requests to write content are refused. Every delivery ships with tracked changes and comments, so the text provably remains the author's.",
      pt: "Só formatação e revisão: pedidos de escrita de conteúdo são recusados. Toda entrega vai com controle de alterações e comentários, para provar que o texto continua do autor.",
    },
    problem: {
      en: "ABNT rules differ from one institution to another, and generic AI tools rewrite the student's text, which puts authorship at risk.",
      pt: "As regras ABNT mudam de uma instituição para outra, e ferramentas genéricas de IA reescrevem o texto do aluno, o que coloca a autoria em risco.",
    },
    built: {
      en: "A Python + Claude pipeline that runs outside the website, in an isolated environment: the LLM interprets the course manual and points out corrections, deterministic code applies the formatting to the .docx XML, and automated checks block the delivery if anything fails. Output: a clean version, a tracked-changes version and a PDF. The public site is a static page on Cloudflare Workers with first-party analytics (Worker + D1), no login and no upload.",
      pt: "Um pipeline em Python + Claude que roda fora do site, em ambiente isolado: o LLM interpreta o manual do curso e aponta correções, código determinístico aplica a formatação no XML do .docx e verificações automáticas bloqueiam a entrega se algo falhar. Saem uma versão limpa, uma versão com controle de alterações e um PDF. O site público é uma página estática em Cloudflare Workers com analytics próprio (Worker + D1), sem login e sem upload.",
    },
    stack: ["Python", "Claude", "Cloudflare Workers", "Cloudflare D1", "OOXML (.docx)"],
    // Counts from the 2 real jobs (SOURCES.md, ADR-035). Only these 3 numbers per job: no check results, no triage items, no split by comment prefix.
    deliveries: {
      jobs: [
        {
          label: { en: "1st job (delivered Oct/2026)", pt: "1º trabalho (entregue em out/2026)" },
          versions: 3,
          changes: 87,
          comments: 14,
        },
        {
          label: { en: "2nd job (delivered Nov/2026)", pt: "2º trabalho (entregue em nov/2026)" },
          versions: 1,
          changes: 69,
          comments: 31,
        },
      ],
      method: {
        en: "Anonymous counts, authorized by both clients. \"Accepted\" means accepted by the client, not approval by the university, which is a separate step. Tracked changes are counted per revision (an adjacent deletion and insertion by the same author count as 1; paragraph marks excluded), by a script over the XML of the delivered marked .docx files (10/11/2026).",
        pt: "Contagens anônimas, autorizadas pelos dois clientes. \"Aceito\" quer dizer aceito pelo cliente, e não a aprovação pela faculdade, que é uma etapa à parte. As alterações rastreadas são contadas por revisão (exclusão e inserção adjacentes do mesmo autor valem 1; marcas de parágrafo fora), por um script sobre o XML dos .docx marcados entregues (10/11/2026).",
      },
    },
    // Controlled timing test on ONE fictional document (SOURCES.md, ADR-037). Case page only. No client, course or institution is named.
    timedTest: {
      summary: {
        en: "I ran the pipeline and manual formatting on the same fictional 29-page thesis. By hand: 4 h 56 min 45 s net. Pipeline: 18 min 20 s on the clock, of which 3 min 45 s was my active work. This is a single run and its design favors the pipeline (see the limitations), so I draw no time-saving conclusion from it. What it shows well is what failed in each condition.",
        pt: "Rodei o pipeline e a formatação manual no mesmo TCC fictício de 29 páginas. À mão: 4h56min45s líquidos. Pipeline: 18min20s de relógio, dos quais 3min45s de trabalho ativo meu. É uma única rodada e o desenho favorece o pipeline (veja as limitações), então não tiro conclusão de tempo economizado. O que o teste mostra bem é o que falhou em cada condição.",
      },
      rows: [
        {
          label: { en: "Time", pt: "Tempo" },
          byHand: {
            en: "4 h 56 min 45 s net (5 h 14 min gross, 2 pauses)",
            pt: "4h56min45s líquidos (5h14min brutos, 2 pausas)",
          },
          pipeline: {
            en: "18 min 20 s on the clock; 3 min 45 s of my active work",
            pt: "18min20s de relógio; 3min45s de trabalho ativo meu",
          },
        },
        {
          label: { en: "4 blocking checks", pt: "4 verificações bloqueantes" },
          byHand: {
            en: "Not all met: clean version OK; no marked-up version; hashes and pagination failed or inconclusive (the delivered .docx was a PDF conversion)",
            pt: "Não atendidas por completo: versão limpa OK; sem versão marcada; hashes e paginação falharam ou ficaram inconclusivos (o .docx entregue era conversão de PDF)",
          },
          pipeline: { en: "4 of 4", pt: "4 de 4" },
        },
        {
          label: { en: "111-item checklist (OK / pending / N/A)", pt: "Checklist de 111 itens (OK / pendente / N/A)" },
          byHand: { en: "87 / 6 / 18", pt: "87 / 6 / 18" },
          pipeline: { en: "80 / 10 / 21 (after the final check)", pt: "80 / 10 / 21 (após a conferência final)" },
        },
        {
          label: { en: "12 planted text errors", pt: "12 erros de texto plantados" },
          byHand: { en: "Corrected", pt: "Corrigidos" },
          pipeline: { en: "Corrected", pt: "Corrigidos" },
        },
        {
          label: { en: "6 in-text citations with wrong capitalization", pt: "6 chamadas com maiúsculas e minúsculas erradas" },
          byHand: { en: "Corrected", pt: "Corrigidas" },
          pipeline: { en: "Corrected", pt: "Corrigidas" },
        },
        {
          label: { en: "Citation × reference mismatches (4)", pt: "Divergências entre citação e referência (4)" },
          byHand: {
            en: "Decided by me, which the process leaves to the client (removed a reference, changed a year, set another year from the text)",
            pt: "Decididas por mim, o que o processo deixa ao cliente (removi uma referência, troquei um ano, pus outro ano conforme o texto)",
          },
          pipeline: { en: "Left as pending for the client", pt: "Deixadas como pendência ao cliente" },
        },
      ],
      notes: [
        {
          en: "Only the totals are comparable; stage boundaries differ between the two conditions.",
          pt: "Só os totais são comparáveis; as fronteiras de etapa diferem entre as duas condições.",
        },
        {
          en: "The pipeline's clock includes the model's processing time and my response time to its questions.",
          pt: "O relógio do pipeline inclui o tempo de processamento do modelo e o meu tempo de resposta às perguntas dele.",
        },
        {
          en: "The pipeline time does not include the fixes for two errors found at the final check (a reference title without bold; \"et al.\" in 1 of 17 citations), made outside the measured time.",
          pt: "O tempo do pipeline não inclui a correção de 2 erros achados na conferência final (título de referência sem negrito; \"et al.\" em 1 de 17 chamadas), feita fora do tempo medido.",
        },
        {
          en: "The 87 \"OK\" by hand include at least 7 items (78 to 84, marked-up version) marked OK although no marked-up version existed. Corrected for that, the two checklist counts are close.",
          pt: "Dos 87 \"OK\" à mão, pelo menos 7 (itens 78 a 84, versão marcada) foram marcados OK sem que existisse versão marcada. Corrigindo isso, as duas contagens de checklist ficam próximas.",
        },
        {
          en: "The lower \"pending\" count by hand partly reflects decisions that the process assigns to the client.",
          pt: "A contagem menor de pendências à mão reflete em parte decisões que o processo atribui ao cliente.",
        },
      ],
      wentWrongPipeline: [
        { en: "A missing dependency in the self-test.", pt: "Dependência faltando no autoteste." },
        { en: "The build of the document's spec failed twice.", pt: "O build da spec do documento falhou 2 vezes." },
        {
          en: "Place and year were missing from the cover footer (a new cycle of checks).",
          pt: "Local e ano fora do pé da capa (novo ciclo de verificações).",
        },
        {
          en: "94 comments broke the rule of commenting only the first occurrence of a repeated error; redone, 53.",
          pt: "94 comentários quebravam a regra de comentar só a 1ª ocorrência de um erro repetido; refeito, 53.",
        },
        { en: "The final check found 2 errors (above).", pt: "A conferência final achou 2 erros (acima)." },
        {
          en: "Not resolved: the abstract in 2 paragraphs (the engine does not merge paragraphs) and the 2019a/2019b citations.",
          pt: "Não resolvidos: resumo em 2 parágrafos (o motor não junta parágrafos) e chamadas 2019a/2019b.",
        },
      ],
      wentWrongByHand: [
        {
          en: "Two course rules were not applied: sub-items (alíneas) stayed lowercase with \";\" and keywords stayed separated by \";\".",
          pt: "Duas regras do curso não foram aplicadas: alíneas ficaram em minúscula com \";\" e palavras-chave ficaram separadas por \";\".",
        },
        {
          en: "Rework: 8 min 15 s (2019a/2019b citations) and 3 min 10 s (spacing after table and figure source lines).",
          pt: "Retrabalho: 8min15s (chamadas 2019a/2019b) e 3min10s (espaçamento após a fonte da tabela e da figura).",
        },
        {
          en: "No marked-up version was produced, so a client could not review the changes.",
          pt: "Não houve versão marcada, então um cliente não conseguiria revisar as alterações.",
        },
        {
          en: "The citation × reference decisions listed in the table were mine, not the client's.",
          pt: "As decisões de citação × referência da tabela foram minhas, não do cliente.",
        },
      ],
      method: [
        {
          en: "The same fictional file in both conditions: 29 pages, an undergraduate thesis with 48 planted errors, no client content.",
          pt: "O mesmo arquivo fictício nas duas condições: 29 páginas, um TCC com 48 erros plantados, nenhum conteúdo de cliente.",
        },
        {
          en: "The same done criterion: the 4 blocking checks plus the 111-item checklist, with the checks also run on the by-hand output.",
          pt: "O mesmo critério de pronto: as 4 verificações bloqueantes mais o checklist de 111 itens, com as verificações rodadas também na saída à mão.",
        },
        {
          en: "By hand: timed by me, without help from Claude. Pipeline: operated in a Claude project, with my own stopwatch read at each stage.",
          pt: "À mão: cronometrado por mim, sem ajuda do Claude. Pipeline: operado num projeto do Claude, com o meu cronômetro lido a cada etapa.",
        },
        {
          en: "The key to the planted errors was opened only after the pipeline run (10/11/2026).",
          pt: "O gabarito dos erros plantados foi aberto só depois da rodada do pipeline (10/11/2026).",
        },
        {
          en: "The pipeline repository is private, so the method is summarized here.",
          pt: "O repositório do pipeline é privado, então o método está resumido aqui.",
        },
      ],
      limitations: [
        { en: "n = 1.", pt: "n = 1." },
        { en: "Fictional document.", pt: "Documento fictício." },
        { en: "I know the process well.", pt: "Eu conheço bem o processo." },
        {
          en: "The by-hand run came first, which favors the pipeline: I already knew the document.",
          pt: "A condição à mão veio primeiro, o que favorece o pipeline: eu já conhecia o documento.",
        },
        {
          en: "The test generator and the pipeline spec were written by someone who had seen the planted errors, so the test is not blind.",
          pt: "O gerador do teste e a spec do pipeline foram escritos por quem tinha visto os erros plantados, então o teste não é cego.",
        },
        {
          en: "Stage boundaries differ between conditions; only totals are comparable.",
          pt: "As fronteiras de etapa são diferentes entre as condições; só os totais são comparáveis.",
        },
        {
          en: "The pipeline was not tested in Word or Google Docs.",
          pt: "O pipeline não foi testado no Word nem no Google Docs.",
        },
        {
          en: "The pipeline was designed for this type of document.",
          pt: "O pipeline foi desenhado para este tipo de documento.",
        },
      ],
      notConcluded: {
        en: "I am not concluding hours saved, nor that the result generalizes to other documents, people or clients.",
        pt: "Não concluo horas economizadas, nem que o resultado vale para outros documentos, pessoas ou clientes.",
      },
    },
    highlights: [
      {
        en: "Regression suite with 29 tests that guard the pipeline's scripts, run on fictional documents generated at every run (29/29 passing).",
        pt: "Suíte de regressão com 29 testes que protegem os scripts do pipeline, sobre documentos fictícios gerados a cada execução (29/29 passando).",
      },
      {
        en: "4 automated checks on the client's actual file that block a delivery if they fail (pagination, quotation integrity, clean version, tracked-changes version), separate from the 29 tests. Plus 1 automated triage check that does not block: it lists quotation × reference mismatches, reviewed by hand.",
        pt: "4 verificações automáticas no arquivo real do cliente que bloqueiam a entrega se falharem (paginação, integridade das citações, versão limpa, versão marcada), separadas dos 29 testes. Mais 1 verificação de triagem automática que não bloqueia: lista divergências entre citação e referência, conferidas à mão.",
      },
      {
        en: "14 real errors documented with root cause and turned into permanent rules; 4 of them also have automated tests, the rest are in the manual checklist.",
        pt: "14 erros reais documentados com causa e convertidos em regras permanentes; 4 deles também têm teste automático, os demais estão no checklist manual.",
      },
      {
        en: "Manual QA checklist with 111 items in 12 stages; 10 formatting manuals from 8 institutions in the Federal District mapped.",
        pt: "Checklist de QA manual com 111 itens em 12 etapas; 10 manuais de formatação de 8 instituições do DF mapeados.",
      },
      {
        en: "R$0/month infrastructure (Cloudflare free tier; the AI subscription is not included).",
        pt: "R$ 0 por mês de infraestrutura (plano gratuito da Cloudflare; a assinatura de IA não está incluída).",
      },
    ],
    // The Observatory grade is not shown (ADR-024): these guardrails already
    // list the controls behind it.
    guardrails: [
      {
        en: "Thesis text is treated as data, never as instructions (prompt-injection defense).",
        pt: "O texto do TCC é tratado como dado, nunca como instrução (defesa contra prompt injection).",
      },
      {
        en: "Rejects .docx files with macros; protected against XXE and zip bombs.",
        pt: "Recusa .docx com macro; proteção contra XXE e zip bomb.",
      },
      {
        en: "CSP with script hashes, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy, COOP.",
        pt: "CSP com hash dos scripts, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy, COOP.",
      },
      {
        en: "Constant-time comparison, password stored as a hash in a Cloudflare Secret, rate limiting.",
        pt: "Comparação em tempo constante, senha como hash em Secret da Cloudflare, rate limit.",
      },
      {
        en: "LGPD: minimal data, IP not stored, 400-day retention, isolated processing and deletion of copies.",
        pt: "LGPD: dados mínimos, IP não gravado, retenção de 400 dias, processamento isolado e exclusão das cópias.",
      },
    ],
    limitations: [
      {
        en: "The 4 blocking checks are run one by one: no script chains them or stops the delivery on its own yet. Blocking is a rule of the process.",
        pt: "As 4 verificações bloqueantes rodam uma a uma: nenhum script as encadeia nem trava a entrega sozinho ainda. O bloqueio é uma regra do processo.",
      },
      {
        en: "Not end-to-end automatic: checks are automated, but applying the formatting is still adjusted per document, with human review.",
        pt: "Não é automático de ponta a ponta: as verificações são automáticas, mas a aplicação da formatação ainda é ajustada por documento, com revisão humana.",
      },
      {
        en: "Processing time per document has not been measured.",
        pt: "O tempo de processamento por documento não foi medido.",
      },
    ],
    links: {
      live: "https://site.autoriaemforma.workers.dev",
      repoPrivate: true,
    },
    builtWith: {
      en: "Developed with the help of Claude.",
      pt: "Desenvolvido com apoio do Claude.",
    },
    page: {
      architecture: {
        main: [
          {
            kind: "io",
            title: { en: "Student sends the .docx", pt: "Aluno envia o .docx" },
            detail: { en: "Via WhatsApp. The website has no upload.", pt: "Pelo WhatsApp. O site não tem upload." },
          },
          {
            kind: "guard",
            title: { en: "Safe reading", pt: "Leitura segura" },
            detail: {
              en: "Size and compression limits, macro rejection, XML parser without DTD/entities.",
              pt: "Limites de tamanho e compressão, recusa de macro, parser XML sem DTD/entidades.",
            },
          },
          {
            kind: "guard",
            title: { en: "Protect quotations", pt: "Proteger citações" },
            detail: {
              en: "Direct quotations and data tables are extracted and fingerprinted before any change.",
              pt: "Citações diretas e tabelas de dados são extraídas e registradas antes de qualquer alteração.",
            },
          },
          {
            kind: "ai",
            title: { en: "Claude interprets the manual", pt: "Claude interpreta o manual" },
            detail: {
              en: "The LLM reads the course's formatting manual and points out corrections. The thesis text is data, never instructions.",
              pt: "O LLM lê o manual de formatação do curso e aponta correções. O texto do TCC é dado, nunca instrução.",
            },
          },
          {
            kind: "code",
            title: { en: "Code applies the formatting", pt: "Código aplica a formatação" },
            detail: {
              en: "Deterministic Python edits the .docx XML, adjusted per document.",
              pt: "Python determinístico edita o XML do .docx, com ajustes por documento.",
            },
          },
          {
            kind: "guard",
            title: { en: "Blocking checks", pt: "Verificações bloqueantes" },
            detail: {
              en: "4 automated checks on the client's file; any failure stops the delivery.",
              pt: "4 verificações automáticas no arquivo do cliente; qualquer falha impede a entrega.",
            },
          },
          {
            kind: "human",
            title: { en: "Human review", pt: "Revisão humana" },
            detail: {
              en: "What the automated triage check lists, plus the 111-item QA checklist, reviewed by hand.",
              pt: "O que a verificação de triagem automática lista, mais o checklist de QA de 111 itens, conferidos à mão.",
            },
          },
        ],
        outputs: [
          { en: "Clean version", pt: "Versão limpa" },
          { en: "Tracked-changes version with comments", pt: "Versão com controle de alterações e comentários" },
          { en: "PDF", pt: "PDF" },
        ],
        parallel: {
          en: "In parallel: a static page on Cloudflare Workers with first-party analytics (Worker + D1): no login, no upload, no third-party trackers.",
          pt: "Em paralelo: página estática em Cloudflare Workers com analytics próprio (Worker + D1): sem login, sem upload, sem rastreadores de terceiros.",
        },
      },
      snippetIds: ["aef-project-instructions", "aef-safe-docx", "aef-quote-integrity", "aef-regression"],
    },
    visible: true,
  },
  {
    slug: "support-agent-governance-prototype",
    name: "Support Agent Governance Prototype",
    featured: false,
    status: "prototype",
    statusNote: {
      en: "Prototype · LLM triage with a rules guardrail, evaluated on 30 synthetic tickets",
      pt: "Protótipo · triagem com LLM e guardrail de regras, avaliada em 30 chamados sintéticos",
    },
    summary: {
      en: "Prototype of an IT ticket triage agent with governance: an LLM (Claude) classifies and drafts a reply, deterministic rules act as a guardrail the LLM can only make stricter, and a person approves before anything is sent.",
      pt: "Protótipo de um agente de triagem de chamados de TI com governança: um LLM (Claude) classifica e sugere a resposta, regras determinísticas funcionam como guardrail que o LLM só pode tornar mais rígido, e uma pessoa aprova antes de qualquer envio.",
    },
    problem: {
      en: "Support teams want to automate ticket handling, but automating access requests, critical incidents or tickets with personal data without clear limits creates risk. Inspired by handling ~1,000 incidents a month.",
      pt: "Times de suporte querem automatizar chamados, mas automatizar pedidos de acesso, incidentes críticos ou chamados com dados pessoais sem limites claros gera risco. Inspirado na experiência com ~1.000 incidentes por mês.",
    },
    built: {
      en: "A local Python prototype. The rules of the first version (standard library only) stay as the guardrail, and an LLM classifier (Claude through the Anthropic API, JSON output validated against closed lists, invalid output goes to a person) is combined with them: the stricter decision wins and any disagreement goes to a person. A reply is drafted only when both allow automation, is checked (sensitive data, claims of actions performed, length) and is sent, in simulation, only after explicit approval. An evaluation harness compares 2 prompt versions and 2 models on 30 labelled synthetic tickets. The audit log records both decisions with sensitive values redacted.",
      pt: "Um protótipo local em Python. As regras da primeira versão (só biblioteca padrão) continuam como guardrail, e um classificador com LLM (Claude pela API da Anthropic, saída JSON validada contra listas fechadas, saída inválida vai para uma pessoa) é combinado com elas: vale a decisão mais restritiva e qualquer divergência vai para uma pessoa. A resposta só é redigida quando os dois permitem automação, é verificada (dados sensíveis, afirmação de ação realizada, tamanho) e é enviada, em simulação, só com aprovação explícita. Um avaliador compara 2 versões de prompt e 2 modelos em 30 chamados sintéticos rotulados. O log de auditoria registra as duas decisões com valores sensíveis mascarados.",
    },
    stack: ["Python", "Claude API"],
    highlights: [
      {
        en: "Evaluation on 30 labelled synthetic tickets, 2 Claude models × 2 prompt versions. With the written policy in the prompt (v2), both models got the category right on 28/30 tickets, against 9/30 for the rules alone.",
        pt: "Avaliação em 30 chamados sintéticos rotulados, 2 modelos Claude × 2 versões de prompt. Com a política escrita no prompt (v2), os dois modelos acertaram a categoria em 28/30 chamados, contra 9/30 das regras sozinhas.",
      },
      {
        en: "Unsafe automation (a ticket that needs a person but would get an automated answer, 21 of the 30): 8/21 with the rules alone; with the guardrail, 1/21 on prompt v1 and 0/21 on v2. The LLM alone would have automated 3/21 (v1) and 1/21 (v2).",
        pt: "Automação indevida (chamado que exige uma pessoa mas receberia resposta automática, 21 dos 30): 8/21 só com as regras; com o guardrail, 1/21 no prompt v1 e 0/21 no v2. O LLM sozinho teria automatizado 3/21 (v1) e 1/21 (v2).",
      },
      {
        en: "The cost of caution: with v2, 4 of the 9 tickets that could be automated still went to a person. Cost per ticket with v2: US$ 0.00016 (Haiku 5.5) against US$ 0.0032 (Sonnet 5.5), at prices checked on 10/11/2026.",
        pt: "O custo da cautela: com o v2, 4 dos 9 chamados que poderiam ser automatizados foram para uma pessoa mesmo assim. Custo por chamado com o v2: US$ 0,00016 (Haiku 5.5) contra US$ 0,0032 (Sonnet 5.5), com preços conferidos em 10/11/2026.",
      },
      {
        en: "84 automated tests (standard library; none calls the API) run in CI on each push (Python 3.10 and 3.13). The results table is generated from a committed results file, and a test checks that the README matches it.",
        pt: "84 testes automatizados (biblioteca padrão; nenhum chama a API) rodam no CI a cada push (Python 3.10 e 3.13). A tabela de resultados é gerada de um arquivo de resultados versionado, e um teste confere que o README bate com ele.",
      },
    ],
    guardrails: [
      {
        en: "The LLM can only make a decision stricter: whatever the rules block it cannot release, and any disagreement between rules and LLM goes to a person.",
        pt: "O LLM só pode tornar a decisão mais rígida: o que as regras bloqueiam ele não libera, e qualquer divergência entre regras e LLM vai para uma pessoa.",
      },
      {
        en: "Invalid LLM output (bad JSON, unknown value, refusal, API error) is treated as a failure and sent to a person.",
        pt: "Saída inválida do LLM (JSON malformado, valor desconhecido, recusa, erro de API) conta como falha e vai para uma pessoa.",
      },
      {
        en: "A reply draft is checked for sensitive data, claims of actions performed and length, and nothing is sent without explicit human approval.",
        pt: "O rascunho de resposta é verificado quanto a dados sensíveis, afirmação de ação realizada e tamanho, e nada é enviado sem aprovação humana explícita.",
      },
      {
        en: "Sensitive data is redacted before it reaches the audit log.",
        pt: "Dados sensíveis são mascarados antes de chegar ao log de auditoria.",
      },
    ],
    limitations: [
      {
        en: "30 synthetic tickets, labels drafted with AI assistance and approved by one reviewer (me): one ticket is 3.3 percentage points. One run per combination, variance not measured.",
        pt: "30 chamados sintéticos, com rótulos redigidos com apoio de IA e aprovados por um revisor (eu): um chamado vale 3,3 pontos percentuais. Uma execução por combinação, variância não medida.",
      },
      {
        en: "Prompt v2 was written from the same policy that produced the labels. The result shows that the model follows a stated policy, not how it would perform on real tickets.",
        pt: "O prompt v2 foi escrito a partir da mesma política que gerou os rótulos. O resultado mostra que o modelo segue uma política declarada, não como ele se sairia em chamados reais.",
      },
      {
        en: "Only classification was evaluated; reply drafts and latency were not.",
        pt: "Só a classificação foi avaliada; os rascunhos de resposta e a latência não.",
      },
      {
        en: "No full prompt-injection defence (5 injection tickets are a sample, not a security assessment), and no masking before the API call: the ticket text is sent as written, only the requester's name is left out.",
        pt: "Sem defesa completa contra prompt injection (5 chamados de injection são uma amostra, não uma avaliação de segurança) e sem mascaramento antes da chamada à API: o texto do chamado é enviado como está, só o nome do solicitante fica de fora.",
      },
      {
        en: "Human approval is a console prompt and sending is simulated; no real ticketing-system integration.",
        pt: "A aprovação humana é uma pergunta no console e o envio é simulado; sem integração com sistema de chamados real.",
      },
    ],
    links: {
      repo: "https://github.com/gustavogg99-ctrl/support-agent-governance-prototype",
      results:
        "https://github.com/gustavogg99-ctrl/support-agent-governance-prototype#8-llm-triage-with-guardrail-results",
      repoPrivate: false,
    },
    visible: true,
  },
  {
    slug: "ethical-ai-policy",
    name: "Corporate AI Use Policy (template)",
    featured: false,
    status: "template",
    statusNote: { en: "Policy template · v2.1", pt: "Modelo de política · v2.1" },
    summary: {
      en: "Template corporate policy for the ethical use of AI, aligned with LGPD, ISO/IEC 42001 and ISO/IEC 27001, with controls against Shadow AI and an AI vendor risk assessment procedure.",
      pt: "Modelo de política corporativa para uso ético de IA, alinhado à LGPD, ISO/IEC 42001 e ISO/IEC 27001, com controles contra Shadow AI e um procedimento de avaliação de risco de fornecedores de IA.",
    },
    problem: {
      en: "Employees adopt AI tools faster than organizations can approve them: personal data goes into unapproved tools, automated decisions skip human review, and nobody knows which AI systems are in use (Shadow AI).",
      pt: "Funcionários adotam ferramentas de IA mais rápido do que as organizações conseguem aprová-las: dados pessoais vão para ferramentas não aprovadas, decisões automatizadas pulam a revisão humana e ninguém sabe quais sistemas de IA estão em uso (Shadow AI).",
    },
    built: {
      en: "A bilingual (EN/PT) policy with 14 sections and an auditable compliance checklist, a section-by-section framework mapping (ISO/IEC 42001, NIST AI RMF, LGPD), and an AI vendor risk assessment procedure with an Excel matrix that scores up to 3 vendors side by side.",
      pt: "Uma política bilíngue (EN/PT) com 14 seções e um checklist de conformidade auditável, um mapeamento seção a seção para frameworks (ISO/IEC 42001, NIST AI RMF, LGPD) e um procedimento de avaliação de risco de fornecedores de IA com uma matriz em Excel que pontua até 3 fornecedores lado a lado.",
    },
    stack: ["LGPD", "ISO/IEC 42001", "ISO/IEC 27001", "NIST AI RMF", "Excel"],
    highlights: [
      {
        en: "Framework mapping: of 23 requirements, 13 covered explicitly, 7 partially and 3 delegated to the adopting organization. Gaps documented in a v3.0 roadmap.",
        pt: "Mapeamento de frameworks: de 23 requisitos, 13 cobertos explicitamente, 7 parcialmente e 3 delegados à organização que adota. Lacunas documentadas num roadmap da v3.0.",
      },
      {
        en: "Vendor risk procedure: inherent-risk tiering, 30 questions in 8 weighted domains, 5 knock-out criteria and required contract clauses.",
        pt: "Procedimento de risco de fornecedores: classificação de risco inerente, 30 perguntas em 8 domínios ponderados, 5 critérios eliminatórios e cláusulas contratuais obrigatórias.",
      },
    ],
    guardrails: [],
    limitations: [
      {
        en: "A template, not an active policy of any organization. Adoption requires legal and governance review by the adopting company.",
        pt: "É um modelo, não a política ativa de nenhuma organização. A adoção exige revisão jurídica e de governança pela empresa que adotar.",
      },
    ],
    links: {
      repo: "https://github.com/gustavogg99-ctrl/ethical-ai-policy",
      repoPrivate: false,
    },
    visible: true,
  },
] satisfies Project[];
