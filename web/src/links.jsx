import React from "react";
import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  TextField,
  EditButton,
  TextInput,
  required,
} from "react-admin";

export const PostList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="incoming_link" />
      <TextField source="outgoing_link" />
      <EditButton basePath="/links" />
    </Datagrid>
  </List>
);

const PostTitle = ({ record }) => {
  return <span>Link {record ? `"${record.incoming_link}"` : ""}</span>;
};

export const PostEdit = (props) => (
  <Edit title={<PostTitle record={props.record} />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="incoming_link" validate={[required()]} />
      <TextInput source="outgoing_link" validate={[required()]} />
    </SimpleForm>
  </Edit>
);

export const PostCreate = (props) => (
  <Create title="Create a Post" {...props}>
    <SimpleForm>
      <TextInput source="incoming_link" validate={[required()]} />
      <TextInput source="outgoing_link" validate={[required()]} />
    </SimpleForm>
  </Create>
);
