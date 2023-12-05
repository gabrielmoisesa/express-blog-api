const response = (status, data) => ({ status, data });

const getData = (data) => {
  if (data) return response('OK', data);
  return response('BAD_REQUEST', { message: 'Invalid fields' });
};

const create = (data) => response('CREATED', data);

const error = (err) => {
  const { message } = err;

  if (message.includes('required') || message.includes('empty')) {
    return response('BAD_REQUEST', { message: 'Some required fields are missing' });
  }

  if (message.includes('already registered')) return response('CONFLICT', { message });
  
  return response('BAD_REQUEST', { message });
};

module.exports = {
  getData,
  create,
  error,
};