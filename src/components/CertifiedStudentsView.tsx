import React, { useState, useMemo } from 'react';
import { useYoga } from '../context/YogaContext';
import { Search, Filter, ShieldCheck, CheckCircle2, AlertTriangle, User, HelpCircle, FileSpreadsheet } from 'lucide-react';
import { PeepalLeaf } from './BotanicalAssets';

export const CertifiedStudentsView: React.FC = () => {
  const { students } = useYoga();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  // Compute filters list dynamically
  const uniqueYears = useMemo(() => {
    return ['All', ...Array.from(new Set(students.map(s => s.year)))].sort((a, b) => (b as string).localeCompare(a as string));
  }, [students]);

  const uniqueLevels = useMemo(() => {
    return ['All', ...Array.from(new Set(students.map(s => s.level.split(' ')[0] + ' ' + s.level.split(' ')[1])))];
  }, [students]);

  // Handle immediate live filtration
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            student.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesYear = selectedYear === 'All' || student.year === selectedYear;
      
      const matchesLevel = selectedLevel === 'All' || 
                           student.level.toLowerCase().includes(selectedLevel.toLowerCase());

      return matchesSearch && matchesYear && matchesLevel;
    });
  }, [students, searchQuery, selectedYear, selectedLevel]);

  return (
    <div id="certified-students-view" className="relative overflow-hidden animate-fadeIn pb-24 px-4 sm:px-6 lg:px-8">
      
      {/* Background decoration */}
      <div className="absolute top-16 right-4 pointer-events-none opacity-5 select-none">
        <PeepalLeaf size={180} />
      </div>

      {/* Editorial Header */}
      <section className="max-w-4xl mx-auto pt-16 pb-12 text-center space-y-6">
        <span className="font-mono text-[10px] tracking-[0.25em] text-biscuit font-bold uppercase">Public Registry & Credentialing</span>
        <h1 className="font-cinzel text-4xl md:text-5xl font-semibold text-espresso tracking-tight">
          YCB Certified Students
        </h1>
        <p className="font-sans text-sm text-espresso/70 max-w-2xl mx-auto">
          Verify and search credentials of all sadhakas who have successfully cleared the official Ministry of Ayush evaluations at Ishwari Yoga Institute.
        </p>
        <div className="w-16 h-0.5 bg-biscuit mx-auto" />
      </section>

      {/* Database Verification Box */}
      <section className="max-w-6xl mx-auto mb-12 artistic-card p-6 rounded-2xl space-y-6">
        
        {/* Verification Inputs Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Search bar */}
          <div className="relative md:col-span-2">
            <label className="block font-sans text-[10px] text-espresso/60 uppercase tracking-widest font-semibold mb-1.5">Search Name / Certificate ID</label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Priyadarshini Joshi"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-primary-white border border-biscuit/30 rounded-lg text-xs text-espresso focus:outline-none focus:border-olive-green"
              />
              <Search className="absolute left-3.5 top-3.5 text-espresso/40" size={14} />
            </div>
          </div>

          {/* Level Filter */}
          <div>
            <label className="block font-sans text-[10px] text-espresso/60 uppercase tracking-widest font-semibold mb-1.5">YCB Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3 py-2.5 bg-primary-white border border-biscuit/30 rounded-lg text-xs text-espresso focus:outline-none focus:border-olive-green cursor-pointer"
            >
              <option value="All">All YCB Levels</option>
              {uniqueLevels.filter(lvl => lvl !== 'All').map(lvl => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div>
            <label className="block font-sans text-[10px] text-espresso/60 uppercase tracking-widest font-semibold mb-1.5">Year of Passing</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2.5 bg-primary-white border border-biscuit/30 rounded-lg text-xs text-espresso focus:outline-none focus:border-olive-green cursor-pointer"
            >
              <option value="All">All Years</option>
              {uniqueYears.filter(y => y !== 'All').map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Database Table Container */}
        <div className="border border-biscuit/20 rounded-xl overflow-hidden shadow-xs bg-primary-white">
          <div className="overflow-x-auto">
            <table className="w-full font-sans text-xs text-left min-w-[700px]">
              <thead className="bg-[#F3EBDD]/50 border-b border-biscuit/20 text-espresso/80 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 flex items-center gap-1">
                    <User size={12} className="text-olive-green" />
                    <span>Student Name</span>
                  </th>
                  <th className="px-6 py-4">Certificate Number</th>
                  <th className="px-6 py-4">Government YCB Level</th>
                  <th className="px-6 py-4 text-center">Graduation Year</th>
                  <th className="px-6 py-4 text-center">Passing Date</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-biscuit/10 text-espresso/80">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-warm-beige/10 transition-colors">
                      {/* Name */}
                      <td className="px-6 py-4 font-semibold text-espresso">{student.name}</td>
                      
                      {/* Cert No (Monospace font matches guidelines for technical indicators) */}
                      <td className="px-6 py-4 font-mono text-xs text-olive-green select-all tracking-wider">
                        {student.certificateNumber}
                      </td>
                      
                      {/* YCB Level */}
                      <td className="px-6 py-4">{student.level}</td>
                      
                      {/* Year */}
                      <td className="px-6 py-4 text-center font-semibold">{student.year}</td>
                      
                      {/* Passing Date */}
                      <td className="px-6 py-4 text-center text-espresso/60">{student.dateOfPassing}</td>
                      
                      {/* Status */}
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          student.status === 'Active'
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : student.status === 'Completed'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {student.status === 'Active' && <CheckCircle2 size={10} />}
                          {student.status === 'Suspended' && <AlertTriangle size={10} />}
                          <span>{student.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-espresso/50 italic font-serif">
                      No matching verified certificates found in the registry database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Verification Summary Info */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-sans text-espresso/50 pt-4 border-t border-biscuit/10">
          <p className="flex items-center gap-1">
            <ShieldCheck size={14} className="text-olive-green" />
            <span>Cryptographic secure local index is synchronized with AYUSH regulatory archives.</span>
          </p>
          <p>
            Showing {filteredStudents.length} of {students.length} certified alumni.
          </p>
        </div>

      </section>

      {/* Certificate Validation FAQ */}
      <section className="max-w-4xl mx-auto py-10 border border-dashed border-biscuit/30 rounded-xl bg-warm-beige/10 p-8 flex flex-col md:flex-row gap-8 items-center">
        <div className="p-4 bg-primary-white rounded-full border border-biscuit/20 text-olive-green shrink-0">
          <FileSpreadsheet size={32} />
        </div>
        <div className="space-y-3">
          <h4 className="font-cinzel text-sm font-bold text-espresso uppercase tracking-wider">Are you a graduate with missing credentials?</h4>
          <p className="font-sans text-xs text-espresso/70 leading-relaxed">
            Occasionally, processing with the Ministry of AYUSH regional offices can cause a 2-3 week delay in registry synchronization. If you cleared your practical exam under the evaluation presidency of Devika Bhide or Shweta Vaikunthe and your name is not listed, please submit your exam copy to our coordinators.
          </p>
        </div>
      </section>

    </div>
  );
};
