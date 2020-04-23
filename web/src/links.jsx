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
  regex
} from "react-admin";

if (!process.env.ABSOLUTE_LINK_PREFIX) {
  throw new Error("ABSOLUTE_LINK_PREFIX is not set");
}

const absoluteLinkPrefix = process.env.ABSOLUTE_LINK_PREFIX

export const PostList = (props) => (
  <List {...props}>
    <Datagrid>
      <FunctionField source="incoming_link" label="Generated link" render={record => toAbsoluteIncomingLink(record.incoming_link)}/>
      <TextField source="outgoing_link" label="Destination" />
      <EditButton basePath="/links" />
    </Datagrid>
  </List>
);

const PostTitle = ({ record }) => {
  return <span>Link {record ? `"${toAbsoluteIncomingLink(record.incoming_link)}"` : ""}</span>;
};

export const PostEdit = (props) => (
  <Edit title={<PostTitle record={props.record} />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" fullWidth/>
      <TextInput source="incoming_link" label="Preview"  format={toAbsoluteIncomingLink} disabled fullWidth />
      <TextInput source="incoming_link" label="Generated link" validate={[required(), validateRelativeUrl]} fullWidth/>
      <TextInput source="outgoing_link" label="Destination" validate={[required()]} fullWidth/>
    </SimpleForm>
  </Edit>
);

export const PostCreate = (props) => (
  <Create title="Create a Post" {...props}>
    <SimpleForm>
      <TextInput source="incoming_link" label="Preview"  format={toAbsoluteIncomingLink} disabled fullWidth />
      <TextInput source="incoming_link" label="Generated link" validate={[required(), validateRelativeUrl]} fullWidth/>
      <TextInput source="outgoing_link" label="Destination" validate={[required()]} fullWidth/>
    </SimpleForm>
  </Create>
);


function toAbsoluteIncomingLink(relativeIncomingLink) {
  return relativeIncomingLink ? absoluteLinkPrefix + relativeIncomingLink : ''
}

const validateRelativeUrl = regex(/^\/[-\w]+/, 'The relative link must start with a "/" character!');
