import styled from "styled-components";
import { ReactComponent as SoundIcon } from "../../assets/sound.svg";
import { ReactComponent as NoSoundIcon } from "../../assets/no-sound.svg";
import ProgressBar from "../Common/ProgressBar";
import useSpotifyPlayer from "./../../hooks/useSpotifyPlayer";
import { useState } from "react";
import { useEffect } from "react";

const StyledExtraControls = styled.div`
  display: flex;
  align-items: center;
  grid-area: extra-controls;
  justify-self: flex-end;
  margin-right: 8px;
`;

const StyledProgressBar = styled(ProgressBar)`
  width: 125px;
  margin-left: 8px;
`;

const ExtraControls = () => {
  const [volumeBeforeMute, setVolumeBeforeMute] = useState(1);
  const [volume, setVolume] = useState(1);
  const { player, ready } = useSpotifyPlayer();

  useEffect(() => {
    if (!ready) {
      return;
    }

    player?.getVolume().then((volume) => {
      setVolume(volume);
    });
  }, [player, ready]);

  const setPlayerVolume = (volume) => {
    player.setVolume(volume).then(() => {
      setVolume(volume);
    });
  };

  // For some reason 0.0 throws: "The provided double value is non-finite"
  const muteVolume = 0.000001;

  const onVolumeIconClicked = () => {
    const targetVolume = volume > muteVolume ? muteVolume : volumeBeforeMute;

    if (targetVolume === muteVolume) {
      setVolumeBeforeMute(volume);
    }

    setPlayerVolume(targetVolume);
  };

  const VolumeIcon = volume > muteVolume ? SoundIcon : NoSoundIcon;

  return (
    <StyledExtraControls>
      <VolumeIcon className="action-icon" onClick={onVolumeIconClicked} />
      <StyledProgressBar
        progress={volume}
        onSetProgress={(volume) => setPlayerVolume(volume)}
      />
    </StyledExtraControls>
  );
};

export default ExtraControls;
