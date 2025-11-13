import React, { useState, useEffect } from "react";
import type { Visitor, VisitorFormData } from "../../types/Visitor";
import './VisitorForm.css';

interface VisitorFormProps {
    visitor?: Visitor;
    onSubmit: (data: VisitorFormData) => void;
    onDelete?: (id: string) => void;
    onClose:() => void;
    isEdit?: boolean;
}

const groups = ['Прохожий','Клиент','Партнер'];

export const VisitorForm: React.FC<VisitorFormProps> =({
    visitor,
    onSubmit,
    onDelete,
    onClose,
    isEdit = false,
}) =>{
    const [formData, setFormData] = useState<VisitorFormData>({
        fullName: '',
        company: '',
        group: '',
        present: false,
    });

    useEffect(() => {
        if(visitor){
            setFormData(visitor);
        }
    },[visitor]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
        const{name, value, type} = e.target;
        setFormData(prev =>({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };
    return(
        <div className = "modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit} className="visitor-form">
                    
                    <div className="form-row">
                        <label>ФИО</label>
                        <input
                            type = "text"
                            name = "fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-row">
                        <label>Компания</label>
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-row">
                        <label>Группа</label>
                        <select
                            name="group"
                            value={formData.group}
                            onChange={handleChange}
                            required
                            className="form-select"
                        >
                            <option value = "">Выбрать</option>
                            {groups.map(group =>(
                                <option key={group} value={group}>
                                    {group}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-row checkbox-row">
                        <label className="checkbox-label">
                        <input
                            type="checkbox"
                            name="present"
                            checked={formData.present}
                            onChange={handleChange}
                            className="checkbox-input"
                        />
                        Присутствие</label>
                    </div>

                    <div className="form-actions">
                        {isEdit && onDelete && (
                            <button
                                type = "button"
                                className="btn-delete"
                                onClick={()=> onDelete(visitor!.id)}
                            >Удалить</button>
                        )}
                        <button type = "submit" className="btn-primary">
                            {isEdit ? 'Сохранить' : 'Добавить'}
                        </button>
                        <button type = "button" className="btn-secondary" onClick={onClose}>
                            Закрыть
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
