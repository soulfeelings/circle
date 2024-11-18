import { http, HttpResponse } from 'msw';
import { v4 as uuid } from 'uuid';
import { API_ROUTES } from "../../types/routes.ts";

let companies = [
    { id: uuid(), name: 'Company A', createdAt: new Date().toISOString() },
    { id: uuid(), name: 'Company B', createdAt: new Date().toISOString() },
];

export const handlers = [
    // Получение списка компаний
    http.get(API_ROUTES.COMPANIES, () => {
        return HttpResponse.json(companies);
    }),

    // Получение компании по ID
    http.get<{ id: string }>(API_ROUTES.COMPANIES_ID, ({ params }) => {
        const company = companies.find((c) => c.id === params.id);
        if (!company) {
            return HttpResponse.json('Company not found', { status: 404 });
        }
        return HttpResponse.json(company);
    }),

    // Создание новой компании
    http.post<any, { name: string }, any>(API_ROUTES.COMPANIES, async ({ request }) => {
        const body = await request.json()
        const newCompany = {
            id: uuid(),
            name: body.name,
            createdAt: new Date().toISOString(),
        };
        companies.push(newCompany);
        return HttpResponse.json(newCompany, { status: 201 });
    }),

    // Обновление компании
    http.put<{ id: string; name: string }>(API_ROUTES.COMPANIES_ID, ({ params, body }) => {
        const companyIndex = companies.findIndex((c) => c.id === params.id);
        if (companyIndex === -1) {
            return HttpResponse.json('Company not found', { status: 404 });
        }
        companies[companyIndex] = { ...companies[companyIndex], name: body.name };
        return HttpResponse.json(companies[companyIndex]);
    }),

    // Удаление компании
    http.delete<{ id: string }>(API_ROUTES.COMPANIES_ID, ({ params }) => {
        const { id } = params;
        companies = companies.filter((c) => c.id !== id);
        return HttpResponse.json(companies);
    }),
];
