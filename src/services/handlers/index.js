const response = (status, data) => ({ status, data });

const getData = (data) => {
  if (data) return response('OK', data);
  return response('BAD_REQUEST', { message: 'Invalid fields' });
};

const error = (err) => {
  const { message } = err;

  if (message.includes('required') || message.includes('empty')) {
    return response('BAD_REQUEST', { message: 'Some required fields are missing' });
  }
  
  return response('BAD_REQUEST', { message });
};

module.exports = {
  getData,
  error,
};