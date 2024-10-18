module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: "*",
      headers: '*',
      credentials: false
    },
  }
];

  // {
  //   name: 'strapi::cors',
  //   config: {
  //     origin: ['https://reservation.makesa.keenetic.link/', 'https://cleaning.makesa.keenetic.link/', 'http://127.0.0.1:5500/'],
  //     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  //     headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
  //     keepHeaderOnError: true,
  //   },
  // }