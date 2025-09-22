'use client'
import React from 'react';
import { useRef, useEffect, useState } from 'react';
import { hightlightsSlides } from '../constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);
  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  // Simplified video control effect
  useEffect(() => {
    videoRef.current.forEach((videoElement, i) => {
      if (videoElement) {
        if (i === videoId && isPlaying) {
          videoElement.play().catch(err => {
            console.error("Video play failed:", err);
          });
        } else {
          videoElement.pause();
        }
      }
    });
  }, [videoId, isPlaying]);

  useGSAP(() => {
    // Animate the slider movement
    gsap.to('#slider', {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 1.5,
      ease: 'power2.inOut',
    });

    // Trigger the very first playback when the component scrolls into view
    gsap.to('#video-carousel-container', {
      scrollTrigger: {
        trigger: '#video-carousel-container',
        toggleActions: 'restart none none none',
      },
      onComplete: () => {
        setVideo((prev) => ({ ...prev, isPlaying: true, startPlay: true }));
      }
    });
  }, [videoId]);

  // Progress bar animation effect
  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId] && startPlay) {
      // Reset progress bar
      gsap.set(span[videoId], {
        width: "0%",
        backgroundColor: "white",
      });

      gsap.set(videoDivRef.current[videoId], {
        width: window.innerWidth < 760 ? "10vw" : window.innerWidth < 1200 ? "10vw" : "4vw",
      });

      // Create animation to move the indicator
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);

          if (progress !== currentProgress) {
            currentProgress = progress;

            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },

        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      if (videoId === 0) {
        anim.restart();
      }

      // Update the progress bar based on video time
      const animUpdate = () => {
        if (videoRef.current[videoId]) {
          anim.progress(
            videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
          );
        }
      };

      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }

      // Cleanup
      return () => {
        gsap.ticker.remove(animUpdate);
      };
    }
  }, [videoId, startPlay, isPlaying]);

  const handleProcess = (type, i) => {
    switch (type) {
      case 'video-end':
        setVideo((prev) => ({ 
          ...prev, 
          videoId: i + 1,
          isLastVideo: false
        }));
        break;
      case 'video-last':
        setVideo((prev) => ({ 
          ...prev, 
          isLastVideo: true,
          isPlaying: false
        }));
        // Auto-restart after last video ends
        setTimeout(() => {
          handleProcess('video-reset');
        }, 1000); // 1 second delay before auto-restart
        break;
      case 'video-reset':
        // Reset all videos to beginning
        videoRef.current.forEach((video) => {
          if (video) {
            video.currentTime = 0;
          }
        });
        setVideo((prev) => ({ 
          ...prev, 
          videoId: 0, 
          isLastVideo: false, 
          isPlaying: true,
          startPlay: true
        }));
        break;
      case 'play':
        setVideo((prev) => ({ ...prev, isPlaying: true }));
        break;
      case 'pause':
        setVideo((prev) => ({ ...prev, isPlaying: false }));
        break;
      default:
        return video;
    }
  };

  const handleLoadedMetaData = (i, e) => {
    setLoadedData((prev) => [...prev, e]);
  };

  return (
    <div id="video-carousel-container">
      <div className='flex items-center'>
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id='slider' className='sm:pr-20 pr-10'>
            <div className='video-carousel_container relative sm:w-[70vw] w-[88vw] md:h-[70vh] sm:h-[50vh] h-[35vh]'>
              <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
                <video
                  playsInline={true}
                  preload='auto'
                  muted
                  ref={(el) => (videoRef.current[i] = el)}
                  onPlay={() => setVideo((prev) => ({ ...prev, isPlaying: true }))}
                  onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                  onEnded={() =>
                    i !== hightlightsSlides.length - 1
                      ? handleProcess('video-end', i)
                      : handleProcess('video-last')
                  }
                >
                  <source src={list.video} type='video/mp4' />
                </video>
              </div>
              
              <div className='absolute top-12 left-[5%] z-10'>
                <div className='hero-title'>{list.textLists[0]}</div>
                <p className='md:text-2xl text-xl font-medium text-white'>
                  {list.textLists[1]}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='relative flex items-center justify-center mt-10'>
        <div className='flex items-center justify-center py-5 px-7 bg-gray-700 backdrop-blur rounded-full'>
          {hightlightsSlides.map((_, i) => (
            <span
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)}
              className='mx-2 w-3 h-3 bg-gray-400 rounded-full relative cursor-pointer'
            >
              <span
                className='absolute h-full w-full rounded-full'
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>
        <button className='control-btn ml-4 p-4 rounded-full bg-gray-700 backdrop-blur flex justify-center items-center'>
          <img
            src={isLastVideo ? '/replay.svg' : !isPlaying ? '/play.svg' : '/pause.svg'}
            alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
            onClick={() => {
              if (isLastVideo) {
                handleProcess('video-reset');
              } else {
                handleProcess(isPlaying ? 'pause' : 'play');
              }
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default VideoCarousel;