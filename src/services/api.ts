export const fetchClassroomData = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          className: 'ClassSwift',
          students: [
            { id: 1, name: 'Alice', score: 10 },
            { id: 2, name: 'Bob', score: 9 },
            { id: 3, name: 'Charlie', score: 8 },
            { id: 4, name: 'David', score: 7 },
            { id: 5, name: 'Eve', score: 6 },
            { id: 6, name: 'sdklv', score: 1 },
            { id: 7, name: 'Hdibj', score: 9 },
            { id: 8, name: 'Cwiovje', score: 8 },
            { id: 9, name: 'Gdv lkijs', score: 3 },
            { id: 10, name: 'Uskldnvsd', score: 4 },
            { id: 11, name: 'Gdv daslkijs', score: 2 },
          ]
        })
      }, 1000);
    })
      
    
    // const response = await fetch('/api/classroom');
    // if (!response.ok) throw new Error('Failed to fetch');
    // return response.json();
  };
  