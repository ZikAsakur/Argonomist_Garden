import { useState, useEffect } from "react";
import type { Visitor, VisitorFormData, Filters } from "../types/Visitor";
import { visitorApi } from "../services/visitorApi";

export const useVisitors = () => {
    const [visitors, setVisitors] = useState<Visitor[]>([]);
    const [filteredVisitors, setFilteredVisitors] = useState<Visitor[]>([]);
    const [filters, setFilters] = useState<Filters>({present: '' });
    const [loading, setLoading] = useState(false);
    const [ error, setError] = useState<string | null>(null);

    const loadVisitors = async () =>{
        try{
            setLoading(true);
            setError(null);
            const data = await visitorApi.getVisitors();
            setVisitors(data);
        } catch (err){
            setError('Ошибка при загрузке посетителей');
            console.error(err);
        } finally{
            setLoading(false);
        }
    };

    const addVisitor = async (visitorData: VisitorFormData) => {
        try{
            setError(null);
            await visitorApi.addVisitor(visitorData);
            await loadVisitors();
        } catch(err) {
            setError('Ошибка при добавлении посетителя');
            throw err;
        }
    };

    const updateVisitor = async (id:string, visitorData: VisitorFormData) =>{
        try{
            setError(null)
            await visitorApi.updateVisitor(id, visitorData);
            await loadVisitors();
        } catch(err) {
            setError('Ошибка при обновлении посетителя');
            throw err;
        }
    };

    const deleteVisitor = async (id:string) => {
        try{
            setError(null);
            await visitorApi.deleteVisitor(id);
            await loadVisitors();
        } catch(err) {
            setError('Ошибка при удалении посетителя');
            throw err;
        }
    };

    useEffect(()=>{
        let result = visitors;

        if (filters.present){
            const isPresent = filters.present ==='true';
            result = result.filter(visitor => visitor.present === isPresent);
        }

        setFilteredVisitors(result);
    }, [visitors, filters]);

    const totalCount = visitors.length;
    const presentCount = visitors.filter(v => v.present).length;
    const absentCount = totalCount - presentCount;

    return{
        visitors: filteredVisitors,
        filters,
        loading,
        error,
        presentCount,
        absentCount,
        setFilters,
        loadVisitors,
        addVisitor,
        updateVisitor,
        deleteVisitor
    };
};