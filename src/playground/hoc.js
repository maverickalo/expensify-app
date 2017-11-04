import React from 'react';
import ReactDOM from 'react-dom';

// const Info = props => (
//   <div>
//     <h1>Info</h1>
//     <p>The Info is: {props.info}</p>
//   </div>
// );

const isAuthInfo = props => (
  <div>
    <h1>YOU ARE LOGGED IN AS ADMIN!</h1>
    <p>The Info is: {props.info}</p>
  </div>
);

// const withAdminWarning = WrappedComponent => {
//   return props => (
//     <div>
//       {props.isAdmin && <p>This is private info. Please don't share!</p>}

//       <WrappedComponent {...props} />
//     </div>
//   );
// };

const requireAuthentication = WrappedComponent => {
  return props => (
    <div>
      {props.isAuthenticated ? (
        <WrappedComponent {...props} />
      ) : (
        <h1>DENIED! Please Log In!</h1>
      )}
    </div>
  );
};

// const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(isAuthInfo);

// ReactDOM.render(
//   <AdminInfo info="These are the details" isAdmin={true} />,
//   document.getElementById('app')
// );
ReactDOM.render(
  <AuthInfo info="These are the details" isAuthenticated={true} />,
  document.getElementById('app')
);
