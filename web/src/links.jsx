import React from "react";
import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  FunctionField,
  NumberField,
  TextField,
  DateField,
  ReferenceField,
  EditButton,
  TextInput,
  required,
  regex,
} from "react-admin";
import { toAbsoluteIncomingLink } from "./absoluteIncomingLink";
import { IncomingLink } from "./IncomingLink";
import { OutgoingLink } from "./OutgoingLink";
import { useStyles } from "./useStyles";

export const LinkList = (props) => {
  const classes = useStyles();
  return (
    <List {...props}>
      <Datagrid>
        <FunctionField
          source="incoming_link"
          label="Generated link"
          className={classes.link}
          render={IncomingLink}
        />
        <ReferenceField
          label="Click count"
          source="incoming_link"
          reference="hits_by_incoming_link"
          link={false}
          sortable={false}
        >
          <NumberField source="hit_count" />
        </ReferenceField>
        <FunctionField
          source="outgoing_link"
          label="Destination"
          className={classes.link}
          render={OutgoingLink}
        />
        <ReferenceField
          label="Redirection count"
          source="outgoing_link"
          reference="hits_by_outgoing_link"
          link={false}
          sortable={false}
        >
          <NumberField source="hit_count" />
        </ReferenceField>
        <ReferenceField
          label="Created by"
          source="id"
          reference="audit.entity_summaries"
          link={false}
          sortable={false}
        >
          <ReferenceField
            source="inserted_by_user_id"
            reference="audit.users_as_last_seen"
            link={false}
          >
            <TextField source="full_name" />
          </ReferenceField>
        </ReferenceField>
        <ReferenceField
          label="Last updated by"
          source="id"
          reference="audit.entity_summaries"
          link={false}
          sortable={false}
        >
          <ReferenceField
            source="last_updated_by_user_id"
            reference="audit.users_as_last_seen"
            link={false}
          >
            <TextField source="full_name" />
          </ReferenceField>
        </ReferenceField>
        <ReferenceField
          label="Last updated at"
          source="id"
          reference="audit.entity_summaries"
          link={false}
          sortable={false}
        >
          <DateField source="last_updated_at" showTime={true} />
        </ReferenceField>

        <EditButton basePath="/links" />
      </Datagrid>
    </List>
  );
};

const LinkTitle = ({ record }) => {
  return (
    <span>
      Link {record ? `"${toAbsoluteIncomingLink(record.incoming_link)}"` : ""}
    </span>
  );
};

export const LinkEdit = (props) => (
  <Edit title={<LinkTitle record={props.record} />} {...props}>
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

export const LinkCreate = (props) => (
  <Create title="Create a Link" {...props}>
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
