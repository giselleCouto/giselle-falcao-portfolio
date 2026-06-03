# Notas para módulo MCP

## Verificação da trilha atual
A trilha atual de `Engenharia de Sistemas de IA Generativa` não possui um módulo dedicado a MCP. Os módulos existentes cobrem RAG, ingestão, embeddings, bancos vetoriais, LLMs, serving, frameworks e validação.

## Descobertas oficiais sobre MCP
Segundo a documentação oficial, o **Model Context Protocol (MCP)** é um padrão open source para conectar aplicações de IA a sistemas externos, como fontes de dados, ferramentas e workflows especializados. A documentação o descreve como uma espécie de "USB-C para aplicações de IA".

A documentação oficial também destaca que o ecossistema MCP é baseado em arquitetura cliente-servidor. Há um **host** de IA, clientes MCP conectados a esse host e servidores MCP que expõem capacidades. O material de arquitetura enfatiza participantes, camadas, protocolo de dados, lifecycle management, primitives e notifications como conceitos centrais.

## Direção pedagógica para o módulo
O novo módulo deve explicar, em ordem:
1. O problema que o MCP resolve.
2. A arquitetura host-client-server.
3. Os tipos de capacidades expostas por servidores MCP.
4. O fluxo essencial: inicialização, descoberta de ferramentas/recursos/prompts e execução.
5. Boas práticas de segurança, governança e observabilidade.
6. Exercícios práticos de desenho arquitetural e avaliação aplicada.

## Fontes consultadas
- https://modelcontextprotocol.io/docs/getting-started/intro
- https://modelcontextprotocol.io/docs/learn/architecture
