const handler = {
  get: (target, property) => {
    if (property in target) {
      return target[property];
    }

    throw new Error(`'${property}' is not a command`);
  },
};

class Commands {
  static get BACK() { return 'back'; }
  static get BROWSE_FIRST() { return 'browse:first'; }
  static get BROWSE_NEXT() { return 'browse:next'; }
  static get BROWSE_PREVIOUS() { return 'browse:previous'; }
  static get BROWSE_LAST() { return 'browse:last'; }
  static get FORWARD() { return 'forward'; }
  static get OPEN() { return 'open'; }
  static get SELECT() { return 'select'; }
  static get SOFT_SELECT() { return 'softselect'; }
  static get YANK() { return 'yank'; }
}

export default new Proxy(Commands, handler);
