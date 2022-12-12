class Place {
  constructor(title, imageUri, address, location) {
    this.id = Date.now().toString() + Math.random().toString();
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location;
  }
}

export default Place;
