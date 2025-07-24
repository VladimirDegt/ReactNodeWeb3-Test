import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { postApi, putApi, getApi } from 'services/api';
import { Box, Button, Input, Textarea, FormControl, FormLabel, VStack } from '@chakra-ui/react';

const MeetingAddEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    agenda: '',
    attendes: [],
    attendesLead: [],
    location: '',
    related: '',
    dateTime: '',
    notes: ''
  });
  const [contacts, setContacts] = useState([]);
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const c = await getApi('api/contact/');
      setContacts(c?.data || []);
      const l = await getApi('api/lead/');
      setLeads(l?.data || []);
      if (id && id !== 'add') {
        const res = await getApi('api/meeting/view/', id);
        if (res?.data) setValues(res.data);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id && id !== 'add') {
      await putApi('api/meeting/edit/' + id, values);
    } else {
      await postApi('api/meeting/add', values);
    }
    navigate('/metting');
  };

  return (
    <Box p={6} maxW="600px" mx="auto">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Agenda</FormLabel>
            <Input name="agenda" value={values.agenda} onChange={handleChange} required />
          </FormControl>
          <FormControl>
            <FormLabel>Date/Time</FormLabel>
            <Input name="dateTime" value={values.dateTime} onChange={handleChange} type="datetime-local" required />
          </FormControl>
          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input name="location" value={values.location} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Related</FormLabel>
            <Input name="related" value={values.related} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Notes</FormLabel>
            <Textarea name="notes" value={values.notes} onChange={handleChange} />
          </FormControl>
          <Button colorScheme="blue" type="submit">{id && id !== 'add' ? 'Update' : 'Create'} Meeting</Button>
          <Button onClick={() => navigate('/metting')} variant="ghost">Cancel</Button>
        </VStack>
      </form>
    </Box>
  );
};

export default MeetingAddEdit; 