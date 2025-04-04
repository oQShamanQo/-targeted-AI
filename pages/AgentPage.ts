import { Page } from '@playwright/test';

export class AgentPage {
  constructor(private page: Page) {}

  async createAgent(name: string) {
    await this.page.click('button#create-agent');
    await this.page.fill('input#agent-name', name);
    await this.page.click('button#submit-agent');
  }

  async editAgent(name: string, newName: string) {
    await this.page.click(`text=${name}`);
    await this.page.click('button#edit-agent');
    await this.page.fill('input#agent-name', newName);
    await this.page.click('button#submit-agent');
  }

  async addTool(agentName: string, toolName: string) {
    await this.page.click(`text=${agentName}`);
    await this.page.click('button#add-tool');
    await this.page.fill('input#tool-name', toolName);
    await this.page.click('button#submit-tool');
  }

  async updateTool(agentName: string, toolName: string, newToolName: string) {
    await this.page.click(`text=${agentName}`);
    await this.page.click(`text=${toolName}`);
    await this.page.click('button#edit-tool');
    await this.page.fill('input#tool-name', newToolName);
    await this.page.click('button#submit-tool');
  }
}