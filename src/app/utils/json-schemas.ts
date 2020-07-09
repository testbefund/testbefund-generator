export const createTestContainerRequestSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    issuingOrganization: {
      type: 'string'
    },
    testDefinitions: {
      description: 'One test specification for each test',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          icdCode: {
            type: 'string'
          },
          title: {
            type: 'string'
          }
        },
        required: [
          'icdCode',
          'title'
        ]
      },
      minItems: 1,
      uniqueItems: true
    }
  },
  required: [
    'issuingOrganization',
    'testDefinitions'
  ]
};
