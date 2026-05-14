export const mapCustomer = (customer) => {
  return {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    role: customer.role?.name || "-",
  };
};
