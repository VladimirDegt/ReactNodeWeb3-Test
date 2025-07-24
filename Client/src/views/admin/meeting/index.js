import React, { useEffect, useState } from 'react';
import { getApi, deleteApi } from 'services/api';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Thead, Tbody, Tr, Th, Td, Box, Flex } from '@chakra-ui/react';

const MeetingList = () => {
  const [meetings, setMeetings] = useState([]);
  const navigate = useNavigate();

  const fetchMeetings = async () => {
    const res = await getApi('api/meeting/');
    setMeetings(res?.data || []);
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const handleDelete = async (id) => {
    await deleteApi('api/meeting/delete/', id);
    fetchMeetings();
  };

  return (
    <Box p={6}>
      <Flex justify="space-between" mb={4}>
        <Box fontSize="2xl" fontWeight="bold">Meetings</Box>
        <Button colorScheme="blue" onClick={() => navigate('/metting/add')}>Add Meeting</Button>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Agenda</Th>
            <Th>Date/Time</Th>
            <Th>Location</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {meetings.map((m) => (
            <Tr key={m._id}>
              <Td>{m.agenda}</Td>
              <Td>{m.dateTime}</Td>
              <Td>{m.location}</Td>
              <Td>
                <Button size="sm" mr={2} onClick={() => navigate(`/metting/edit/${m._id}`)}>Edit</Button>
                <Button size="sm" mr={2} onClick={() => navigate(`/metting/view/${m._id}`)}>View</Button>
                <Button size="sm" colorScheme="red" onClick={() => handleDelete(m._id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default MeetingList;