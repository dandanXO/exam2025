import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setClassroomData, incrementScore, decrementScore } from '../features/classSlice';
import { fetchClassroomData } from '../services/api';
import { QRCodeCanvas } from 'qrcode.react';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftPanel = styled.div<{ show: boolean }>`
  width: ${({ show }) => (show ? '350px' : '0')};
  background-color: white;
  box-shadow: ${({ show }) => (show ? '2px 0 5px rgba(0,0,0,0.1)' : 'none')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  transition: width 0.3s ease-in-out;
  position: relative;
  padding: ${({ show }) => (show ? '20px' : '0')};
`;

const QRCodeContainer = styled.div`
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;
const GroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Group = styled.div<{ color: string }>`
  display: flex;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  background-color: ${({ color }) => color};
`;

const CopyButton = styled.button`
  background: blue;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 10px;
  border-radius: 5px;
`;

const RightPanel = styled.div`
  flex: 2;
  padding: 20px;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  border-bottom: 2px solid #ddd;
`;

const Title = styled.h2`
  font-size: 20px;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const MenuDropdown = styled.div`
  position: absolute;
  top: 50px;
  right: 20px;
  background: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  overflow: hidden;
`;

const MenuItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  &:hover {
    background: #f1f1f1;
  }
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 2px solid #ddd;
`;

const TabButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 10px;
  background: ${({ active }) => (active ? '#007bff' : 'white')};
  color: ${({ active }) => (active ? 'white' : '#007bff')};
  border: none;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background: #0056b3;
    color: white;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
`;

const Card = styled.div<{ selected?: boolean }>`
  background-color: ${({ selected }) => (selected ? '#e1eaff' : 'white')};
  border: 2px solid ${({ selected }) => (selected ? '#007bff' : '#ddd')};
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const ScoreButton = styled.button`
  margin: 4px;
  padding: 4px 8px;
  cursor: pointer;
  border: none;
  font-size: 14px;
`;

const colors = ['#FFD700', '#FFA07A', '#87CEFA', '#90EE90', '#FF69B4'];

export default function Classroom() {
  const dispatch = useAppDispatch();
  const classroom = useAppSelector(state => state.classroom);
  const [selectedStudent, setSelectedStudent] = useState<{ id: number, name: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'list' | 'group'>('list');
  const [groupedStudents, setGroupedStudents] = useState<any[][]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const menuOptions = ['設定', '重設分數', '顯示統計', '隨機分組', '退出課堂'];

  useEffect(() => {
    fetchClassroomData().then(data => {
      dispatch(setClassroomData(data));

      // 讀取 LocalStorage，恢復選擇的學生
      const storedStudentId = localStorage.getItem('selectedStudentId');
      if (storedStudentId) {
        const foundStudent = data.students.find((s: any) => s.id.toString() === storedStudentId);
        if (foundStudent) {
          setSelectedStudent(foundStudent);
        }
      }
    });
  }, [dispatch]);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleStudentClick = (student: { id: number, name: string }) => {
    if (selectedStudent?.id === student.id) {
      setSelectedStudent(null);
      localStorage.removeItem('selectedStudentId');
    } else {
      setSelectedStudent(student);
      localStorage.setItem('selectedStudentId', student.id.toString());
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`已複製: ${text}`);
  };

  const groupStudentsRandomly = (students: any[]): any[][] => {
    // 隨機打亂學生列表
    const shuffled = [...students].sort(() => Math.random() - 0.5);

    // 分組，每組最多 5 人
    const groups: any[][] = [];
    while (shuffled.length > 0) {
      groups.push(shuffled.splice(0, Math.min(5, shuffled.length)));
    }

    return groups;
  };

  const handleGroupButtonClick = () => {
    const groups = groupStudentsRandomly(classroom.students);
    setGroupedStudents(groups);
  };

  return (
    <Wrapper>
      {/* 左側 QRCode + 學生資訊 */}
      <LeftPanel show={selectedStudent !== null}>
        {selectedStudent !== null && (
          <QRCodeContainer>
            <CloseButton onClick={() => { setSelectedStudent(null); localStorage.removeItem('selectedStudentId'); }}>X</CloseButton>
            <h3>Join 302 Science</h3>
            <div>
              <strong>ID:</strong> {selectedStudent.id}
              <CopyButton onClick={() => copyToClipboard(selectedStudent.id.toString())}>複製 ID 📋</CopyButton>
            </div>
            <div>
              <strong>Link:</strong> 
              <CopyButton onClick={() => copyToClipboard(`https://www.classswift.viewsonic.io/njo6ru?id=${selectedStudent.id}`)}>
                複製 Link 📋
              </CopyButton>
            </div>
            <QRCodeCanvas
              value={`https://www.classswift.viewsonic.io/njo6ru?id=${selectedStudent.id}`}
              size={200}
            />
            <p>學生姓名: {selectedStudent.name}</p>
          </QRCodeContainer>
        )}
      </LeftPanel>

      {/* 右側 */}
      <RightPanel>
        <Header>
          <Title>302 Science 👤 {classroom.students.length}/30</Title>
          <div ref={menuRef}>
            <MenuButton onClick={() => setMenuOpen(!menuOpen)}  >⋮</MenuButton>
            {menuOpen && (
                <MenuDropdown
                onBlur={() => setMenuOpen(false)}
                tabIndex={1} // Make the dropdown focusable
                >
                {menuOptions.map(option => (
                    <MenuItem
                    onClick={() => setMenuOpen(false)}
                    key={option}
                    >
                    {option}
                    </MenuItem>
                ))}
                </MenuDropdown>
            )}
            </div>
        </Header>

        {/* Tab 切換 */}
        <Tabs>
          <TabButton active={activeTab === 'list'} onClick={() => setActiveTab('list')}>Student List</TabButton>
          <TabButton 
            active={activeTab === 'group'} 
            onClick={() => {
              if (activeTab !== 'group') {
                handleGroupButtonClick();
              }
              setActiveTab('group');
            }}
          >
            Group
          </TabButton>
        </Tabs>

        {activeTab === 'list' ? (
          <Grid>
            {classroom.students.map(student => (
              <Card 
                key={student.id} 
                selected={selectedStudent?.id === student.id} 
                onClick={() => handleStudentClick(student)} 
                style={{ borderColor: student.score === 0 ? 'red' : undefined }}
              >
                <div>{student.name}</div>
                <div>分數: {student.score}</div>
                <ScoreButton 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    if (student.score > 0) dispatch(decrementScore(student.id)); 
                  }} 
                  disabled={student.score === 0}
                >
                  -1
                </ScoreButton>
                <ScoreButton 
                  onClick={(e) => { e.stopPropagation(); dispatch(incrementScore(student.id)); }}
                >
                  +1
                </ScoreButton>
              </Card>
            ))}
          </Grid>
        ) : (
          <GroupWrapper>
            {groupedStudents.map((group, index) => (
              <Group key={index} color={colors[index % colors.length]}>
                {group.map((student: any) => (
                  <Card key={student.id} onClick={() => handleStudentClick(student)}>
                    {student.name}（分數: {student.score}）
                  </Card>
                ))}
              </Group>
            ))}
          </GroupWrapper>
        )}
      </RightPanel>
    </Wrapper>
  );
}
