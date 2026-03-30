import * as Yup from 'yup';

// Helper function to create a string field with max length and optional required validation
const buildStringField = (max: number, label: string, required = true, code?: boolean) => {
  let schema = Yup.string().max(max, 'Maximum characters reached');
  if (required) {
    schema = schema.required(`${label} is required`);
  }
  if(code){
    schema = schema.required(`${label} is required`).matches(/^\S*$/, 'Code must not contain spaces.');
  }
  return schema;
};

// Generate field validation functions for different max lengths
const fieldString1 = (fieldName: string, required = true, label = 'Field') => ({
  [fieldName]: buildStringField(1, label, required),
});

const fieldString3 = (fieldName: string, required = true, label = 'Field') => ({
  [fieldName]: buildStringField(3, label, required),
});

const fieldString5 = (fieldName: string, required = true, label = 'Field') => ({
  [fieldName]: buildStringField(5, label, required),
});

const fieldString15 = (fieldName: string, required = true, label = 'Field') => ({
  [fieldName]: buildStringField(15, label, required, true),
});

const fieldString25 = (fieldName: string, required = true, label = 'Field') => ({
  [fieldName]: buildStringField(25, label, required),
});

const fieldString50 = (fieldName: string, required = true, label = 'Field') => ({
  [fieldName]: buildStringField(50, label, required),
});

const fieldString150 = (fieldName: string, required = true, label = 'Field') => ({
  [fieldName]: buildStringField(150, label, required),
});

const fieldString255 = (fieldName: string, required = true, label = 'Field') => ({
  [fieldName]: buildStringField(255, label, required),
});

// Export all validation functions
export { fieldString1, fieldString3, fieldString5, fieldString15, fieldString25, fieldString50, fieldString150, fieldString255 };
