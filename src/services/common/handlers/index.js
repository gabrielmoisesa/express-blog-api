const response = (status, data) => ({ status, data });

const getData = (data) => {
  if (!data) return response('NOT_FOUND', { message: 'No data avaible' });
  return response('OK', data); 
};

const create = (data) => response('CREATED', data);

const error = (errorMessage, useDefaultRequiredMessage = false) => {
  const { message } = errorMessage;

  if (useDefaultRequiredMessage) {
    return response('BAD_REQUEST', { message: 'Some required fields are missing' });
  }
  
  return response('BAD_REQUEST', { message });
};

const conflict = (message) => response('CONFLICT', { message });

const notFound = (message) => response('NOT_FOUND', { message });

module.exports = {
  getData,
  create,
  error,
  conflict,
  notFound,
};