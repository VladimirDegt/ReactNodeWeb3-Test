import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getApi } from 'services/api';
import { Box, Text, Button, VStack } from '@chakra-ui/react';

const MeetingView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState(null);

  useEffect(() => {
    const fetchMeeting = async () => {
      const res = await getApi('api/meeting/view/', id);
      setMeeting(res?.data || null);
    };
    fetchMeeting();
  }, [id]);

  if (!meeting) return <Box p={6}>Loading...</Box>;

  return (
    <Box p={6} maxW="600px" mx="auto">
      <VStack align="start" spacing={3}>
        <Text fontWeight="bold">Agenda: {meeting.agenda}</Text>
        <Text>Date/Time: {meeting.dateTime}</Text>
        <Text>Location: {meeting.location}</Text>
        <Text>Related: {meeting.related}</Text>
        <Text>Notes: {meeting.notes}</Text>
        <Button mt={4} onClick={() => navigate('/metting')}>Back to list</Button>
      </VStack>
    </Box>
  );
};

export default MeetingView;
