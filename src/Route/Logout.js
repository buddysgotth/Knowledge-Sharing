const Logout = () => {
  document.cookie = 'name=; max-age=604800';
  document.cookie = 'tkn=; max-age=604800';
  document.cookie = 'slug=; max-age=604800';

  return (window.location = '/');
};

export default Logout;
