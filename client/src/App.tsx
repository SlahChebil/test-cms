import { useEffect, useState } from 'react';
import './App.css'
import Table from './components/Table'
import SearchBar from './components/SearchBar';
import Modal from './components/Modal';
interface IData {
  id : number,
  wordFirstLang: string,
  sentenceFirstLang: string,
  wordSecondLang: string,
  sentenceSecondLang: string,
};

function App() {
  const columns: Array<{
    key: keyof IData;
    header: string;
    render?: (
      value: IData[keyof IData],
    ) => React.ReactNode;
  }> = [
    { key: 'id', header: 'ID' },
    { key: 'wordFirstLang', header: 'First Word' },
    { key: 'sentenceFirstLang', header: 'First Sentence' },
    { key: 'wordSecondLang', header: 'Second Word' },
    { key: 'sentenceSecondLang', header: 'Second Sentence' },
  ];
  // const [data, setData] = useState<IData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<IData[]>([]);
  const [selectedRow, setSelectedRow] = useState<IData | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const pageSize = 10;

  const handleEdit = (row: IData) => {
    setSelectedRow(row);
    setModalOpen(true); // Open modal to edit
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRow(null);
  };
  useEffect(() => {
    fetch(`http://localhost:3000/words?page=${currentPage}&size=${pageSize}&search=${searchQuery}`)
      .then((response) => {
        return response.json();
      })
      .then(({data,totalCount}) =>{
        setTotalCount(totalCount);
        // setData(data)
        setFilteredData(data);
      });
  }, [currentPage,searchQuery]);

  const handleSave = async (updatedData: IData) => {
    if (!selectedRow) return;
    try {
      const response = await fetch(`http://localhost:3000/words/${selectedRow.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData), // Send the updated data as JSON
      });
  
      if (!response.ok) {
        throw new Error('Failed to update the data');
      }
  
      setFilteredData(
        filteredData.map((row) => (row.id === selectedRow.id ? { ...row, ...updatedData } : row))
      );
      setModalOpen(false); // Close the modal
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // const lowerCaseQuery = query.toLowerCase();
    // const filtered = data.filter(
    //   (item) =>
    //     item.wordFirstLang.toLowerCase().includes(lowerCaseQuery) ||
    //     item.wordSecondLang.toLowerCase().includes(lowerCaseQuery) ||
    //     (item.sentenceFirstLang &&
    //       item.sentenceSecondLang.toLowerCase().includes(lowerCaseQuery))
    // );
    // setFilteredData(filtered);
  };
  return (
    <>
      <h1>Admin Interface for Content Management System</h1>
      {/* <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="p-2 border rounded w-full"
        /> */}
      <SearchBar onSearch={handleSearch}></SearchBar>
      <Table
        data={filteredData}
        columns={columns}
        currentPage={currentPage}
        pageSize={pageSize}
        totalCount={totalCount}
        onPageChange={setCurrentPage}
        onEdit={handleEdit}
        >
        </Table>
        {selectedRow && <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        rowData={selectedRow}
        onSave={handleSave}
      />}
    </>
  )
}

export default App
