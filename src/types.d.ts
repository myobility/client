// 타입 interface 모아두는 파일
export interface Coordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export interface Position {
  coords: Coordinates;
}
