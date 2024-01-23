import {
  DeCafClient,
  DeCafProxy,
  EditAudioTracksMessage,
  EditTracksInfoMessage,
  FocusStateMessage,
  GetStatusMessage,
  IPlaybackSessionState,
  LoadMessage,
  PlaybackStates,
  RawFirmwareMessage,
  SeekMessage,
  SenderConnectedMessage,
  SenderDisconnectedMessage,
  SetVolumeMessage,
  ShowMediaControlsMessage,
  StandbyChangedMessage,
  StopMessage,
  TerminateMessage,
  VisibilityChangedMessage,
  VolumeChangedMessage
} from '@useless-media-public/useless-decaf-client-sdk';

export class ScaffoldDeCafClient extends DeCafClient {
  private readonly container: HTMLDivElement;
  private readonly deCaf: DeCafProxy;
  private readonly video: HTMLVideoElement;
  private state: IPlaybackSessionState;

  constructor(container: HTMLDivElement, deCaf: DeCafProxy, state: IPlaybackSessionState) {
    super(container, deCaf, state);

    this.container = container;
    this.deCaf = deCaf;
    this.state = state;

    const video = document.querySelector<HTMLVideoElement>('video#video');
    if (video) {
      this.video = video;
    }
    else {
      this.video = document.createElement('video');
      this.video.id = 'video';
      this.video.setAttribute('autoplay', '');
      this.video.setAttribute('width', '100%');
      this.video.setAttribute('height', '100%');
      container.appendChild(this.video);
    }
  }

  public async handleCustomMessage(message: RawFirmwareMessage): Promise<void> {}
  public async handleLoad(message: LoadMessage): Promise<void> {}

  public async handleEditAudioTracks(message: EditAudioTracksMessage): Promise<void> {}
  public async handleEditTracks(message: EditTracksInfoMessage): Promise<void> {}
  public async handleFocusState(message: FocusStateMessage): Promise<void> {}
  public async handleGetStatus(message: GetStatusMessage): Promise<void> {}
  public async handlePause(): Promise<void> {}
  public async handlePlay(): Promise<void> {}
  public async handleSeek(message: SeekMessage): Promise<void> {}
  public async handleSenderConnected(message: SenderConnectedMessage): Promise<void> {}
  public async handleSenderDisconnected(message: SenderDisconnectedMessage): Promise<void> {}
  public async handleSetVolume(message: SetVolumeMessage): Promise<void> {}
  public async handleShowMediaControls(message: ShowMediaControlsMessage): Promise<void> {}
  public async handleStandbyChanged(message: StandbyChangedMessage): Promise<void> {}
  public async handleStop(message: StopMessage): Promise<void> {}
  public async handleTerminate(message: TerminateMessage): Promise<void> {}
  public async handleVisibilityChanged(message: VisibilityChangedMessage): Promise<void> {}
  public async handleVolumeChanged(message: VolumeChangedMessage): Promise<void> {}
}