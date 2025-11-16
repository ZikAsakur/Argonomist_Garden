import type { Visitor, VisitorFormData } from '../types/Visitor';

const API_BASE_URL = import.meta.env.PROD ? 'https://argonomistgarden-production.up.railway.app' // Будет ваш URL после деплоя
  : 'http://localhost:3000';

export const visitorApi = {
    async getVisitors(): Promise<Visitor[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/visitors`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching visitors:', error);
      throw new Error('Не удалось загрузить посетителей. Проверьте, запущен ли json-server.');
    }
  },

    async addVisitor(visitor: VisitorFormData): Promise<Visitor> {
        const response = await fetch(`${API_BASE_URL}/visitors`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({...visitor, id: Date.now().toString()}),
        });
        if (!response.ok) throw new Error('Ошибка при добавлении посетителя');
        return response.json();
    },

    async updateVisitor(id: string, visitor: VisitorFormData): Promise<Visitor>{
        const response = await fetch(`${API_BASE_URL}/visitors/${id}`,{
            method:'PUT',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({...visitor, id}),
        });

        if (!response.ok) throw new Error('Ошибка при обновлении посетителя');
        return response.json();
    },

    async deleteVisitor(id: string): Promise<void>{
        const response = await fetch(`${API_BASE_URL}/visitors/${id}`,{
            method:'DELETE',
        });
        if (!response.ok) throw new Error('Ошибка при удалении посетителя');
    },
};