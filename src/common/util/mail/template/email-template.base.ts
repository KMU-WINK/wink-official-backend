export interface EmailTemplateBase {
  subject(): string;
  html(): string;
}
