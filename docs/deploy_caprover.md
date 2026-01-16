# Guia de Deploy no CapRover - Sapienza.Dominus

Este documento descreve o processo de publicação (CI/CD) da aplicação **Sapienza.Dominus** (Backend .NET e Frontend React) utilizando **GitHub Actions** e **CapRover**.

## 1. Visão Geral

O pipeline de deploy é acionado automaticamente a cada **push na branch `main`**. O processo consiste em:
1.  **Build**: Criação das imagens Docker para o Backend e Frontend.
2.  **Push**: Envio das imagens para o **GitHub Container Registry (GHCR)**.
3.  **Deploy**: Comando enviado ao CapRover para baixar as novas imagens do GHCR e atualizar os serviços.

## 2. Pré-requisitos

-   Instância do CapRover rodando e acessível (ex: `https://captain.codegen.zensuite.com.br`).
-   Repositório GitHub com o código fonte.
-   Acesso de Administrador ao CapRover e ao Repositório GitHub.

## 3. Configuração do CapRover

Antes do primeiro deploy, é necessário criar os aplicativos ("Apps") no painel do CapRover:

1.  **Backend App**: Crie um app (ex: `sapienza-backend`).
    -   Habilite HTTPS.
    -   Nas configurações de **Container Port**, certifique-se de que a porta interna está correta (o padrão do .NET container é `8080`).
2.  **Frontend App**: Crie um app (ex: `sapienza-frontend`).
    -   Habilite HTTPS.
    -   Container Port padrão para o Nginx é `80`.

## 4. Configuração do GitHub (Secrets)

Para que o GitHub Actions consiga comunicar com o CapRover, as seguintes "Secrets" devem ser configuradas no repositório (`Settings` > `Secrets and variables` > `Actions`):

| Nome da Secret | Descrição | Exemplo |
| :--- | :--- | :--- |
| `CAPROVER_SERVER` | URL do painel do CapRover | `https://captain.codegen.zensuite.com.br` |
| `CAPROVER_PASSWORD` | Senha de administrador do CapRover | `SuaSenhaForte123` |
| `CAPROVER_APP_BACKEND` | Nome exato do app Backend criado no CapRover | `sapienza-backend` |
| `CAPROVER_APP_FRONTEND` | Nome exato do app Frontend criado no CapRover | `sapienza-frontend` |

> **Nota**: O token do GitHub (`GITHUB_TOKEN`) é usado automaticamente para autenticação no GHCR, não é necessário configurá-lo manualmente, mas o workflow precisa de permissão `packages: write`.

## 5. Arquivos de Configuração

### Workflow do GitHub (`.github/workflows/deploy.yml`)
Define os passos de build e deploy. Ele usa a CLI do CapRover (`caprover deploy`) para notificar o servidor após o push da imagem.

### Dockerfiles
-   **Backend**: `Sapienza.Dominus.HttpApi.Host/Dockerfile`
-   **Frontend**: `abp-react-v2/Dockerfile` (Multi-stage build com Nginx)

### Configuração de Produção (`appsettings.Production.json`)
O backend utiliza este arquivo para conexões de produção. Certifique-se de que as strings de conexão (MongoDB, Redis) apontem para os serviços internos do CapRover (ex: `srv-captain--mongo`).

## 6. Como Rodar o Deploy

O processo é **automático**. Basta enviar alterações para a branch `main`:

```bash
git add .
git commit -m "Nova funcionalidade"
git push origin main
```

Você pode acompanhar o progresso na aba **Actions** do seu repositório no GitHub.

## 7. Solução de Problemas Comuns

-   **Erro de Permissão (GHCR)**: Se o build falhar ao tentar dar push no GHCR, verifique se o workflow tem `permissions: packages: write`.
-   **App não atualiza**: Verifique os logs de "Deployment" no painel do CapRover. Se o CapRover não conseguir baixar a imagem, pode ser um problema de autenticação com o registro privado (GHCR). Nesses casos, adicione as credenciais do GHCR nas configurações de "Docker Registry" do App no CapRover.
