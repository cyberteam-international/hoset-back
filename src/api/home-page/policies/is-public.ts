/**
 * `is-public` policy
 * Allows public access without authentication
 */

export default (policyContext, config, { strapi }) => {
  // Allow access to all users (public)
  return true;
};