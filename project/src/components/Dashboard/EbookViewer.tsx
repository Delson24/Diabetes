import React, { useState } from 'react';
import { BookOpen, Download, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { ebookChapters, EbookSection } from '../../data/ebookContent';

export const EbookViewer: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const totalPages = 175;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleChapterClick = (chapterId: number) => {
    setCurrentChapter(chapterId);
    // Set page to first page of chapter (simplified)
    const pageStart = (chapterId - 1) * 15 + 1;
    setCurrentPage(pageStart);
  };

  const renderContent = (section: EbookSection) => {
    switch (section.type) {
      case 'title':
        return <h1 className="text-3xl font-bold text-gray-800 mb-6">{section.content}</h1>;
      case 'subtitle':
        return <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-6">{section.content}</h2>;
      case 'paragraph':
        return <p className="text-gray-700 leading-relaxed mb-4">{section.content}</p>;
      case 'list':
        return (
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4 ml-4">
            {Array.isArray(section.content) && section.content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        );
      case 'tip':
        return (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4 rounded-r-lg">
            <p className="text-blue-800">{section.content}</p>
          </div>
        );
      case 'warning':
        return (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 rounded-r-lg">
            <p className="text-yellow-800">{section.content}</p>
          </div>
        );
      case 'example':
        return (
          <div className="bg-green-50 border border-green-200 p-4 mb-4 rounded-lg">
            <p className="text-green-800">{section.content}</p>
          </div>
        );
      default:
        return null;
    }
  };

  const getCurrentChapterContent = () => {
    return ebookChapters.find(chapter => chapter.id === currentChapter);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-blue-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl shadow-md">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Guia Completo do Diabetes
              </h1>
              <p className="text-gray-600">Seu manual para uma vida saudável</p>
            </div>
          </div>
          <button className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar no ebook..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Table of Contents */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-blue-100">
            <h2 className="font-semibold text-gray-800 mb-4">Índice</h2>
            <div className="space-y-2">
              {ebookChapters.map((chapter) => (
                <button
                  key={chapter.id}
                  onClick={() => handleChapterClick(chapter.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${
                    currentChapter === chapter.id
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md'
                      : 'hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  <div className={`font-medium text-sm ${currentChapter === chapter.id ? 'text-white' : ''}`}>
                    {chapter.title}
                  </div>
                  <div className={`text-xs ${
                    currentChapter === chapter.id 
                      ? 'text-white/80' 
                      : 'text-gray-500 group-hover:text-blue-500'
                  }`}>
                    Páginas {chapter.pages}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Ebook Content */}
        <div className="lg:col-span-3">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100">
            {/* Page Content */}
            <div className="p-8 min-h-[700px] bg-gradient-to-br from-white to-blue-50 rounded-t-xl">
              <div className="max-w-3xl mx-auto">
                {currentChapter === 1 && currentPage === 1 ? (
                  <div className="text-center space-y-6">
                    <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <BookOpen className="w-16 h-16 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800">
                      Guia Completo do Diabetes
                    </h1>
                    <p className="text-xl text-gray-600">
                      Tudo que você precisa saber para uma vida saudável e equilibrada
                    </p>
                    <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl border border-blue-200">
                      <h2 className="text-lg font-semibold text-blue-800 mb-2">
                        Bem-vindo ao seu guia personalizado!
                      </h2>
                      <p className="text-blue-700">
                        Este ebook foi desenvolvido especialmente para pessoas que convivem com diabetes,
                        oferecendo informações práticas, dicas valiosas e estratégias comprovadas para
                        manter sua saúde em dia.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="prose max-w-none space-y-4">
                    {getCurrentChapterContent()?.content.map((section, index) => (
                      <div key={index}>
                        {renderContent(section)}
                      </div>
                    ))}
                    
                    {/* Page indicator */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <div className="text-center text-sm text-gray-500">
                        Página {currentPage} de {totalPages}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="p-4 border-t border-gray-200 flex items-center justify-between">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 disabled:from-gray-50 disabled:to-gray-50 disabled:text-gray-400 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Página {currentPage} de {totalPages}
                </span>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={currentPage}
                    onChange={(e) => handlePageChange(parseInt(e.target.value) || 1)}
                    className="w-20 p-2 text-center border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    max={totalPages}
                  />
                  <span className="text-sm text-gray-600">Ir para página</span>
                </div>
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 disabled:from-gray-50 disabled:to-gray-50 disabled:text-gray-400 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <span>Próxima</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};