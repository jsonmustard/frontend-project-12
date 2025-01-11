import AddChannel from './AddChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';
import EditChannel from './EditChannel.jsx';

const modals = {
  AddChannel,
  RemoveChannel,
  EditChannel,
};

export default (modalName) => modals[modalName];