import React from 'react';
import messages from 'lib/text';
import style from './style.css';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default ({
  isClosed,
  isCancelled,
  isDelivered,
  isPaid,
  isHold,
  isDraft,
  setClosed,
  setCancelled,
  setDelivered,
  setPaid,
  setHold,
  setDraft,
}) => (
  <div className={style.filter}>
    <SelectField
      className={style.select}
      fullWidth
      value={isDraft}
      onChange={(event, index, value) => {
        setDraft(value);
      }}
      floatingLabelText={messages.orders_draft}
    >
      <MenuItem value={null} primaryText={messages.all} label=" " />
      <MenuItem value={false} primaryText={messages.no} />
      <MenuItem value primaryText={messages.yes} />
    </SelectField>

    <SelectField
      className={style.select}
      fullWidth
      value={isHold}
      onChange={(event, index, value) => {
        setHold(value);
      }}
      floatingLabelText={messages.orders_hold}
    >
      <MenuItem value={null} primaryText={messages.all} label=" " />
      <MenuItem value={false} primaryText={messages.no} />
      <MenuItem value primaryText={messages.yes} />
    </SelectField>

    <SelectField
      className={style.select}
      fullWidth
      value={isPaid}
      onChange={(event, index, value) => {
        setPaid(value);
      }}
      floatingLabelText={messages.orders_paid}
    >
      <MenuItem value={null} primaryText={messages.all} label=" " />
      <MenuItem value={false} primaryText={messages.no} />
      <MenuItem value primaryText={messages.yes} />
    </SelectField>

    <SelectField
      className={style.select}
      fullWidth
      value={isDelivered}
      onChange={(event, index, value) => {
        setDelivered(value);
      }}
      floatingLabelText={messages.orders_delivered}
    >
      <MenuItem value={null} primaryText={messages.all} label=" " />
      <MenuItem value={false} primaryText={messages.no} />
      <MenuItem value primaryText={messages.yes} />
    </SelectField>

    <SelectField
      className={style.select}
      fullWidth
      value={isCancelled}
      onChange={(event, index, value) => {
        setCancelled(value);
      }}
      floatingLabelText={messages.orders_cancelled}
    >
      <MenuItem value={null} primaryText={messages.all} label=" " />
      <MenuItem value={false} primaryText={messages.no} />
      <MenuItem value primaryText={messages.yes} />
    </SelectField>

    <SelectField
      className={style.select}
      fullWidth
      value={isClosed}
      onChange={(event, index, value) => {
        setClosed(value);
      }}
      floatingLabelText={messages.orders_closed}
    >
      <MenuItem value={null} primaryText={messages.all} label=" " />
      <MenuItem value={false} primaryText={messages.no} />
      <MenuItem value primaryText={messages.yes} />
    </SelectField>
  </div>
);
