import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'services/translation';
import asService from 'hoc/asService';

const useStyles = makeStyles({
  margin: {
    marginRight: '.5em',
  },
});

const CategoryFormDialog = ({
  open, onCancel, onConfirm, isNew, item,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [editable, setEditable] = useState(null);
  useEffect(() => {
    setEditable(item);
  }, [open]);
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{t(isNew ? 'New category' : 'Edit category')}</DialogTitle>
      <DialogContent>
        {editable && (
          <div>
            <IconButton
              className={classes.margin}
              style={{ backgroundColor: editable.color }}
              onClick={() => setEditable({ ...editable, color: randomColor() })}
            />
            <Input
              placeholder={t('Name')}
              onChange={({ target: { value } }) => setEditable({ ...editable, name: value })}
              value={editable.name}
            />
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          {t('Cancel')}
        </Button>
        <Button onClick={event => onConfirm(editable, event)} color="primary" autoFocus>
          {t('Save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CategoryFormDialog.propTypes = {
  open: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
  item: PropTypes.shape(),
};

CategoryFormDialog.defaultProps = {
  open: false,
  isNew: false,
  item: null,
};

const options = {
  activeProp: 'open', resolveProp: 'onConfirm', rejectProp: 'onCancel', forceResolveOnReject: true, rejectValue: null,
};

const Service = asService(options)(CategoryFormDialog);

export default Service.create();
