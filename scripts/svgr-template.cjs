// ./scripts/svgr-template.cjs
module.exports = ({ componentName, jsx }) => {
  return `
import * as React from 'react';

const ${componentName} = (props) => ${jsx};

export default ${componentName};
`;
};
