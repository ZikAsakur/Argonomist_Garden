import React from "react";
import type { Visitor } from "../../types/Visitor";
import './VisitorTable.css';

interface VisitorTableProps{
    visitors: Visitor[];
    onVisitorClick: (visitor:Visitor) => void;
}

export const VisitorTable: React.FC<VisitorTableProps> =({
    visitors,
    onVisitorClick
}) =>{
    if (visitors.length === 0){
        return <div className="no-visitors">Посетители не найдены</div>
    }

    return (
        <div className="table-container">
            <table className="visitor-table">
                <thead>
                    <tr>
                        <th>Номер</th>
                        <th>ФИО</th>
                        <th>Компания</th>
                        <th>Группа</th>
                        <th>Присутствие</th>
                    </tr>
                </thead>
                <tbody>
                    {visitors.map((visitor, index)=>(
                        <tr
                            key ={visitor.id}
                            className="visitor-row"
                            onClick={()=> onVisitorClick(visitor)}
                        >
                            <td className="number-cell">{index + 1}</td>
                            <td className="name-cell">{visitor.fullName}</td>
                            <td className="company-cell">{visitor.company}</td>
                            <td className="group-cell">{visitor.group}</td>
                             <td className="presence-cell">
                                <img 
                                src={visitor.present ? "/presence-icon.png" : "/absence-icon.png"} 
                                alt={visitor.present ? "Присутствует" : "Отсутствует"}
                                className="presence-icon"
                                />
                            </td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>
        </div>
    );
};