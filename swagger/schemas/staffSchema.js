module.exports = {
  type: "object",
  properties: {
    _id: {
      type: "string",
      description: "Autogenerated ID of the staff",
      readOnly: true,
    },
    firstName: {
      type: "string",
      description: "The first name of the staff",
      example: "Solomon",
    },
    lastName: {
      type: "string",
      description: "The last name of the staff",
      example: "Grundy",
    },
    gender: {
      type: "string",
      enum: ["male", "female", "other"],
      description: "Gender of the staff",
      example: "male",
    },
    email: {
      type: "string",
      format: "email",
      description: "Email address of the staff",
      example: "solomongrundy@school.edu",
    },
    phone: {
      type: "string",
      description: "Phone number of the staff",
      example: "09012345678",
    },
    subjects: {
      type: "array",
      description: "List of subject IDs the staff teaches",
      items: {
        type: "string",
        format: "uuid",
        example: "60f6e9f2b7a1c142d8ef8c11",
      },
    },
    classIds: {
      type: "array",
      description: "List of class IDs assigned to the staff",
      items: {
        type: "string",
        format: "uuid",
        example: "60f6e9f2b7a1c142d8ef8c12",
      },
    },
    hireDate: {
      type: "string",
      format: "date-time",
      description: "Date the staff was hired",
      example: "2024-08-15T10:00:00Z",
    },
    address: {
      type: "object",
      description: "Optional user address",
      properties: {
        street: { type: "string", example: "123 Applebay Street" },
        city: { type: "string", example: "Gotham" },
        state: { type: "string", example: "New York" },
        zip: { type: "string", example: "10001" },
        country: { type: "string", example: "USA" },
      },
    },
    qualification: {
      type: "string",
      description: "Academic or professional qualification",
      example: "B.Sc in Physics",
    },
    status: {
      type: "string",
      enum: ["active", "inactive", "suspended"],
      description: "Employment status of the staff",
      example: "active",
    },
    role: {
      type: "string",
      enum: ["admin", "staff"],
      description: "System role of the staff",
      example: "staff",
    },
    createdAt: {
      type: "string",
      format: "date-time",
      description: "Timestamp when the staff account was created",
      readOnly: true,
    },
    updatedAt: {
      type: "string",
      format: "date-time",
      description: "Timestamp when the staff account was last updated",
      readOnly: true,
    },
  },
  required: [
    "firstName",
    "lastName",
    "gender",
    "email",
    "phone",
    "qualification",
    "status",
    "role",
  ],
};
