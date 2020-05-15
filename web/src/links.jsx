import React from "react";
import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  FunctionField,
  NumberField,
  ReferenceField,
  TextField,
  EditButton,
  TextInput,
  required,
  regex,
} from "react-admin";
import { toAbsoluteIncomingLink, toLinkOpeningNewTab } from "./utils";

export const PostList = (props) => (
  <List {...props}>
    <Datagrid>
      <FunctionField
        source="incoming_link"
        label="Generated link"
        render={(record) => toAbsoluteIncomingLink(record.incoming_link)}
      />
      <ReferenceField
        label="Click count"
        source="incoming_link"
        reference="hits_by_incoming_link"
        link={false}
      >
        <NumberField source="hit_count" />
      </ReferenceField>
      <FunctionField
        source="outgoing_link"
        label="Destination"
        render={(record) => toLinkOpeningNewTab(record.outgoing_link)}
      />
      <ReferenceField
        label="Redirection count"
        source="outgoing_link"
        reference="hits_by_outgoing_link"
        link={false}
      >
        <NumberField source="hit_count" />
      </ReferenceField>
      <EditButton basePath="/links" />
    </Datagrid>
  </List>
);

const PostTitle = ({ record }) => {
  return (
    <span>
      Link {record ? `"${toAbsoluteIncomingLink(record.incoming_link)}"` : ""}
    </span>
  );
};

export const PostEdit = (props) => (
  <Edit title={<PostTitle record={props.record} />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" fullWidth />
      <TextInput
        source="incoming_link"
        label="Preview"
        format={toAbsoluteIncomingLink}
        disabled
        fullWidth
      />
      <TextInput
        source="incoming_link"
        label="Generated link"
        validate={[required(), urlStartsWithSlash, urlContainsValidCharacters]}
        fullWidth
      />
      <TextInput
        source="outgoing_link"
        label="Destination"
        validate={[required()]}
        fullWidth
      />
    </SimpleForm>
  </Edit>
);

export const PostCreate = (props) => (
  <Create title="Create a Post" {...props}>
    <SimpleForm>
      <TextInput
        source="incoming_link"
        label="Preview"
        format={toAbsoluteIncomingLink}
        disabled
        fullWidth
      />
      <TextInput
        source="incoming_link"
        label="Generated link"
        validate={[required(), urlStartsWithSlash, urlContainsValidCharacters]}
        fullWidth
      />
      <TextInput
        source="outgoing_link"
        label="Destination"
        validate={[required()]}
        fullWidth
      />
    </SimpleForm>
  </Create>
);

const urlStartsWithSlash = regex(
  /^\//,
  'The relative link must start with a "/" character!'
);
const urlContainsValidCharacters = regex(
  /^.[-\w/]+$/,
  'The relative link can only contain letters, numbers, "_", "/" and "-"!'
);
