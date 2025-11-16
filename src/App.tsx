import React, { useState, useEffect } from 'react';
import './App.css';
import { VisitorTable } from './components/VisitorTable/VisitorTable';
import { VisitorForm } from './components/VisitorForm/VisitorForm';
import { Filter } from './components/Filter/Filter';
import {useVisitors} from './hooks/useVisitors';
import type { Visitor,VisitorFormData } from './types/Visitor';

function App() {
  const {
    visitors,
    filters,
    loading,
    error,
    presentCount,
    absentCount,
    setFilters,
    loadVisitors,
    addVisitor,
    updateVisitor,
    deleteVisitor,
  } = useVisitors();

  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadVisitors();
  },[]);

  const filteredBySearch = visitors.filter(visitor =>
    visitor.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddVisitor = () => {
    setSelectedVisitor(null);
    setIsEditMode(false);
    setIsFormOpen(true);
  };

  const handleEditVisitor = (visitor: Visitor) =>{
    setSelectedVisitor(visitor);
    setIsEditMode(true);
    setIsFormOpen(true);
  };

  const handleSubmitVisitor = async(formData: VisitorFormData) =>{
    try{
      if(selectedVisitor){
        await updateVisitor(selectedVisitor.id, formData);
      }else{
        await addVisitor(formData);
      }
      setIsFormOpen(false)
      setSelectedVisitor(null);
    } catch(err){
    }
  };

  const handleDeleteVisitor = async(id: string) =>{
    try{
      await deleteVisitor(id);
      setIsFormOpen(false);
      setSelectedVisitor(null);
    } catch(err){}
  };

  const handleCloseForm = () =>{
    setIsFormOpen(false);
    setSelectedVisitor(null);
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };



  return (
    <div className='app'>

      <header className='app-header'>
        <div className="header-left">
          <img src="/Argonomist_Garden/logo.png" alt="Агрёном Сад" className="logo" />
        </div>
        <div className="header-center">
          <div className="search-container">
            <input
              type="text"
              placeholder="Поиск по ФИО..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
          <button className="btn-add" onClick={handleAddVisitor}>
            Добавить
          </button>
        </div>

          <div className="header-right">
          <div className="stats-header">
            <div className="stats-title">Посетители</div>
            <div className="stats-numbers">
              <span className="stat-present">{presentCount}</span>
              <span className="stat-divider"> / </span>
              <span className="stat-absent">{absentCount}</span>
            </div>
          </div>
        </div>
      </header>

      <main className='app-main'>
        <VisitorTable
          visitors={filteredBySearch}
          onVisitorClick={handleEditVisitor}
      />
      {error && <div className='error-message'>{error}</div>}
      {loading && <div className='loading'>Загрузка...</div>}
      </main>

      <footer className="app-footer">
        <Filter 
          filters={filters}
          onFiltersChange={setFilters}
        />
      </footer>

      {isFormOpen && (
        <VisitorForm
          visitor={selectedVisitor || undefined}
          onSubmit={handleSubmitVisitor}
          onDelete={isEditMode ? handleDeleteVisitor : undefined}
          onClose={handleCloseForm}
          isEdit={isEditMode}
          />
      )}
    </div>
  );
}

export default App
