import { test, expect } from '@playwright/test';
import { AgentPage } from '../pages/AgentPage';

test.describe('Agent Tests', () => {
  
  // Переменная для хранения экземпляра AgentPage
  let agentPage: AgentPage;

  // Этот метод выполнится перед каждым тестом
  test.beforeEach(async ({ page }) => {
    await page.goto('https://app.targetai.ai');

    agentPage = new AgentPage(page); // Инициализируем AgentPage с текущей страницей

    // Выполняем вход
    await page.getByRole('textbox', { name: 'Электронная почта' }).click();
    await page.getByRole('textbox', { name: 'Электронная почта' }).fill('polivanov.jr@gmail.com');
    await page.getByRole('textbox', { name: 'Пароль' }).click();
    await page.getByRole('textbox', { name: 'Пароль' }).fill('Wnpipkwita1%');
    await page.getByTestId('submit-button').click();
    await page.waitForNavigation();
  });

  // Тест для создания агента
  test('Create an Agent', async ({ page }) => {
    await page.getByRole('link', { name: 'Agents' }).nth(1).click();
    await page.getByTestId('create-agent-button').click();
    await page.getByRole('textbox', { name: 'Name for Humans' }).click();
    await page.getByRole('textbox', { name: 'Name for Humans' }).fill('Test Agent');
    await page.getByRole('paragraph').filter({ hasText: /^$/ }).click();
    await page.getByRole('paragraph').filter({ hasText: /^$/ }).dblclick();
    await page.locator('.tiptap').fill('Say my name');
    await page.getByTestId('save-button').click();
    await expect(page).toHaveURL(/.*agents/);
    const content = await page.content();
    await expect(page.locator('text=Test Agent')).toBeVisible({ timeout: 10000 });

  });

  // Тест для редактирования агента
  test('Edit an Agent', async ({ page }) => {
    await page.getByRole('link', { name: 'Agents' }).nth(1).click();
    await page.getByTestId('edit-agent-button').click();
    await page.getByRole('textbox', { name: 'Name for Humans' }).click();
    await page.getByRole('textbox', { name: 'Name for Humans' }).fill('Test Agent1');
    await page.locator('div').filter({ hasText: /^Say my name$/ }).nth(1).click();
    await page.locator('.tiptap').fill('Say my names');
    await page.getByTestId('save-button').click();
    await expect(page).toHaveURL(/.*agents/);
    const content = await page.content();
    await expect(page.locator('text=Test Agent1')).toBeVisible({ timeout: 10000 });
  });

  // Тест для добавления инструмента
  test('Add a Tool to Agent', async ({ page }) => {
    await page.getByRole('link', { name: 'Agents' }).nth(1).click();
    await page.getByTestId('edit-agent-button').click();
    await page.getByText('Add Tool').click();
    await page.getByRole('menuitem', { name: 'newFunction' }).click();
    await page.locator('#menu- > .MuiBackdrop-root').click();
    await page.getByTestId('save-button').click();
    await expect(page).toHaveURL(/.*agents/);
    const content = await page.content();
    await expect(page.locator('text=Test Agent1')).toBeVisible({ timeout: 10000 });
  });

  // Тест для обновления инструмента
  test('Update a Tool', async ({ page }) => {
    await page.getByRole('link', { name: 'Tools' }).nth(1).click();
    await page.getByRole('row', { name: 'newFunction' }).getByRole('button').first().click();
    await page.getByTestId('add-input-data-button').click();
    await page.locator('.MuiTableContainer-root').first().click();
    await page.getByTestId('save-button').click();
    await page.getByRole('link', { name: 'Tools' }).first().click();
    const content = await page.content();
    await expect(page.locator('text=newFunction')).toBeVisible({ timeout: 10000 });
  });
});