export const cfghttp = {
  BASE_URL: process.env.NODE_ENV === 'production' ? 'production' : 'https://billing.hududgaz.uz/api',
  BASE_URL_RESOURCE: process.env.NODE_ENV === 'production' ? 'api' : 'http://192.168.44.47:9097/api',
  BASE_TIMEOUT: 20 * 1000,
  UPLOAD_TIMEOUT: 2 * 60 * 1000
}

export const urls = {
  LOGIN:"admin/auth/login"
}
