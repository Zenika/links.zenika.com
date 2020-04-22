import React from "react";
import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  FunctionField,
  TextField,
  EditButton,
  TextInput,
  required,
} from "react-admin";

const PREFIX = "https://links.zenika.com/link"

export const PostList = (props) => (
  <List {...props}>
    <Datagrid>
      <FunctionField source="incoming_link" label="Generated link" render={record => addUrlPrefix(record.incoming_link)}/>
      <TextField source="outgoing_link" label="Destination" />
      <EditButton basePath="/links" />
    </Datagrid>
  </List>
);

const PostTitle = ({ record }) => {
  return <span>Link {record ? `"${addUrlPrefix(record.incoming_link)}"` : ""}</span>;
};

export const PostEdit = (props) => (
  <Edit title={<PostTitle record={props.record} />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" fullWidth/>
      <TextInput source="incoming_link" label="Preview"  format={v => addUrlPrefix(v)} disabled fullWidth />
      <TextInput source="incoming_link" label="Generated link" validate={[required()]} fullWidth/>
      <TextInput source="outgoing_link" label="Destination" validate={[required()]} fullWidth/>
    </SimpleForm>
  </Edit>
);

export const PostCreate = (props) => (
  <Create title="Create a Post" {...props}>
    <SimpleForm>
      <TextInput source="incoming_link" label="Preview"  format={v => addUrlPrefix(v)} disabled fullWidth />
      <TextInput source="incoming_link" label="Generated link" validate={[required()]} fullWidth/>
      <TextInput source="outgoing_link" label="Destination" validate={[required()]} fullWidth/>
    </SimpleForm>
  </Create>
);


function addUrlPrefix(v) {
  return !v ? '' : PREFIX + v
}