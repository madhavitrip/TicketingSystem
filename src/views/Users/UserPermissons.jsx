import React from 'react'

const UserPermissons = () => {
  return (
    <div>UserPermissons</div>
  )
}

export default UserPermissons


// import React from 'react'
// import { Container } from 'react-bootstrap'
// import { Form } from 'react-router-dom'

// const UserPermissons = () => {

//     const handleInputChange = (e) => {
//         const { name, type, checked } = e.target;

//         if (
//           name === "canCreate" ||
//           name === "canView" ||
//           name === "canEdit" ||
//           name === "canDelete"
//         ) {
//           // Declare modulePermissions array
//           const modulePermissions = [
//             "canCreate",
//             "canView",
//             "canEdit",
//             "canDelete",
//           ];

//           const permissionIndex = user.permissions.indexOf(name);

//           if (permissionIndex === -1) {
//             // If the permission is not in the list, add it and check all previous permissions for that module
//             const currentIndex = modulePermissions.indexOf(name);

//             setUser((prevUser) => ({
//               ...prevUser,
//               permissions: [
//                 ...prevUser.permissions,
//                 ...modulePermissions.slice(0, currentIndex + 1),
//               ],
//             }));
//           } else {
//             // If the permission is in the list, uncheck it and remove all subsequent permissions for that module
//             setUser((prevUser) => ({
//               ...prevUser,
//               permissions: prevUser.permissions.filter(
//                 (perm) => modulePermissions.indexOf(perm) < permissionIndex,
//               ),
//             }));
//           }
//         } else {
//           // For other input fields, handle as before
//           setUser({
//             ...user,
//             [name]: type === "checkbox" ? checked : e.target.value,
//           });
//         }
//       };

//       const handleSubmit = async (e) => {
//         e.preventDefault();
//         user.createdBy = 1;

//         onAddUser(user);

//         setUser({
//           firstName: "",
//           middleName: "",
//           lastName: "",
//           email: "",
//           mobileNo: "",
//           designation: "",
//           permissions: [],
//         });

//     return (
//         <div>
//             <Container fluid>
//                 <Form>
//                     <Form.Group controlId="formPermissions" className="text-center">
//                         <Form.Label className="font-weight-bold">Permissions</Form.Label>
//                         <Table bordered responsive className="text-center">
//                             <thead>
//                                 <tr>
//                                     <th>Module Name</th>
//                                     <th>Create</th>
//                                     <th>View</th>
//                                     <th>Edit</th>
//                                     <th>Delete</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr>
//                                     <td>Users</td>
//                                     <td>
//                                         <Form.Check
//                                             type="checkbox"
//                                             name="canCreate"
//                                             checked={user.permissions.includes("canCreate")}
//                                             onChange={handleInputChange}
//                                         />
//                                     </td>
//                                     <td>
//                                         <Form.Check
//                                             type="checkbox"
//                                             name="canView"
//                                             checked={user.permissions.includes("canView")}
//                                             onChange={handleInputChange}
//                                         />
//                                     </td>
//                                     <td>
//                                         <Form.Check
//                                             type="checkbox"
//                                             name="canEdit"
//                                             checked={user.permissions.includes("canEdit")}
//                                             onChange={handleInputChange}
//                                         />
//                                     </td>
//                                     <td>
//                                         <Form.Check
//                                             type="checkbox"
//                                             name="canDelete"
//                                             checked={user.permissions.includes("canDelete")}
//                                             onChange={handleInputChange}
//                                         />
//                                     </td>
//                                 </tr>
//                                 {/* Add more rows for additional modules */}
//                             </tbody>
//                         </Table>
//                     </Form.Group>
//                 </Form>
//             </Container>
//         </div>
//     )
// }

// export default UserPermissons