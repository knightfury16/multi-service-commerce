module.exports = {
  AUTHORIZED_ROLES: ['ADMIN'],
  ALLOWED_ROLES: ['ADMIN', 'BUYER'],
  ALLOWED_PRODUCT_UPDATE: [
    'name',
    'price',
    'description',
    'category',
    'stock',
    'numOfReviews',
    'ratings'
  ],
  ALLOWED_USER_UPDATE: ['name', 'phoneNum', 'dateOfBirth', 'gender']
};
