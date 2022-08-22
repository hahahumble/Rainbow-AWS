import React, {useState, Fragment, useEffect, useRef} from 'react'
import {TwitterPicker} from 'react-color'
import {CogIcon, ExternalLinkIcon} from '@heroicons/react/solid'
import './App.css'

function App() {
  let locations = [
    {
      name: 'United States',
      areas: [
        {country: '🇺🇸', region: 'N. Virginia', code: 'us-east-1'},
        {country: '🇺🇸', region: 'Ohio', code: 'us-east-2'},
        {country: '🇺🇸', region: 'N. California', code: 'us-west-1'},
        {country: '🇺🇸', region: 'Oregon', code: 'us-west-2'},
      ],
    },
    {
      name: 'Africa',
      areas: [
        {country: '🇿🇦', region: 'Cape Town', code: 'af-south-1'},
      ],
    },
    {
      name: 'Asia Pacific',
      areas: [
        {country: '🇭🇰', region: 'Hong Kong', code: 'ap-east-1'},
        {country: '🇮🇩', region: 'Jakarta', code: 'ap-southeast-3'},
        {country: '🇮🇳', region: 'Mumbai', code: 'ap-south-1'},
        {country: '🇯🇵', region: 'Osaka', code: 'ap-northeast-3'},
        {country: '🇰🇷', region: 'Seoul', code: 'ap-northeast-2'},
        {country: '🇸🇬', region: 'Singapore', code: 'ap-southeast-1'},
        {country: '🇦🇺', region: 'Sydney', code: 'ap-southeast-2'},
        {country: '🇯🇵', region: 'Tokyo', code: 'ap-northeast-1'},
      ],
    },
    {
      name: 'Canada',
      areas: [
        {country: '🇨🇦', region: 'Central', code: 'ca-central-1'},
      ],
    },
    {
      name: 'Europe',
      areas: [
        {country: '🇩🇪', region: 'Frankfurt', code: 'eu-central-1'},
        {country: '🇮🇪', region: 'Ireland', code: 'eu-west-1'},
        {country: '🇬🇧', region: 'London', code: 'eu-west-2'},
        {country: '🇮🇹', region: 'Milan', code: 'eu-south-1'},
        {country: '🇫🇷', region: 'Paris', code: 'eu-west-3'},
        {country: '🇸🇪', region: 'Stockholm', code: 'eu-north-1'},
      ],
    },
    {
      name: 'Middle East',
      areas: [
        {country: '🇧🇭', region: 'Bahrain', code: 'me-south-1'},
      ],
    },
    {
      name: 'South America',
      areas: [
        {country: '🇧🇷', region: 'São Paulo', code: 'sa-east-1'},
      ],
    }
  ]

  let colorPaletteDefault = {
    "us-east-1": '#1a232f',
    "us-east-2": '#1a232f',
    "us-west-1": '#1a232f',
    "us-west-2": '#1a232f',
    'af-south-1': '#1a232f',
    'ap-east-1': '#1a232f',
    'ap-southeast-3': '#1a232f',
    'ap-south-1': '#1a232f',
    'ap-northeast-3': '#1a232f',
    'ap-northeast-2': '#1a232f',
    'ap-northeast-1': '#1a232f',
    'ap-southeast-2': '#1a232f',
    'ap-southeast-1': '#1a232f',
    'ca-central-1': '#1a232f',
    'eu-central-1': '#1a232f',
    'eu-west-1': '#1a232f',
    'eu-west-2': '#1a232f',
    'eu-south-1': '#1a232f',
    'eu-west-3': '#1a232f',
    'eu-north-1': '#1a232f',
    'me-south-1': '#1a232f',
    'sa-east-1': '#1a232f'
  }

  let colorPicker = {
    "us-east-1": false,
    "us-east-2": false,
    "us-west-1": false,
    "us-west-2": false,
    'af-south-1': false,
    'ap-east-1': false,
    'ap-southeast-3': false,
    'ap-south-1': false,
    'ap-northeast-3': false,
    'ap-northeast-2': false,
    'ap-northeast-1': false,
    'ap-southeast-2': false,
    'ap-southeast-1': false,
    'ca-central-1': false,
    'eu-central-1': false,
    'eu-west-1': false,
    'eu-west-2': false,
    'eu-south-1': false,
    'eu-west-3': false,
    'eu-north-1': false,
    'me-south-1': false,
    'sa-east-1': false
  }

  const useIsMount = () => {
    const isMountRef = useRef(true);
    useEffect(() => {
      isMountRef.current = false;
    }, []);
    return isMountRef.current;
  };

  const [, setColor] = useState("")
  const [colorPalette, setColorPalette] = useState(colorPaletteDefault)
  const [displayColorPicker, setDisplayColorPicker] = useState(colorPicker)

  const isMount = useIsMount();

  useEffect(() => {
    if (isMount) {
      // First Render
      chrome.storage.sync.get(['colorPalette'], function (result) {
        // console.log('Value currently is ' + JSON.stringify(result["colorPalette"]));
        if (result["colorPalette"] != null) {  // Exist in storage
          setColorPalette(result["colorPalette"])  // Update colorPalette state
        } else {
          chrome.storage.sync.set({"colorPalette": colorPaletteDefault}, function () {
            console.log("Change saved")
          });
        }
      });
    } else {
      // Subsequent Render
      chrome.storage.sync.set({"colorPalette": colorPalette}, function () {
        console.log("Change saved")
      });
    }
  });

  const updateColor = (code, color) => {
    setColor(color.hex)
    setColorPalette(previousState => {
      return {...previousState, [code]: color.hex}
    });
  }

  const handleClick = (code) => {  // open popup window
    setDisplayColorPicker(previousState => {
      return {...previousState, [code]: true}
    });
  }

  const handleClose = () => {
    setDisplayColorPicker(false)
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  // Option page
  // document.addEventListener('DOMContentLoaded', () => {
  //   let y = document.getElementById("option_page");
  //   y.addEventListener("click", openOptionPage);
  // });

  // About page
  // document.addEventListener('DOMContentLoaded', () => {
  //   let y = document.getElementById("index_link");
  //   y.addEventListener("click", openIndex);
  // });

  // function openOptionPage() {
  //   chrome.tabs.create({ url: "chrome://extensions/?options=" + chrome.runtime.id })
  // }

  function openAboutPage() {
    chrome.tabs.create({
      active: true,
      url: "https://chrome.google.com/webstore/detail/rainbow-aws-aws-console-h/foicngnfgjoobicakmgedfomghgdkljg"
    });
  }

  return (
    <div className="dark:bg-gray-900 transition duration-200 w-96 overflow-hidden">
      <header className="">
        <div className="pl-5 pt-4 flex flex-row">
          <img src="/icon128.png" style={{width: "32px", height: "32px"}} alt="icon"/>
          <p className="text-lg pl-4 pt-1 text-gray-700 font-semibold font-title dark:text-white">Rainbow AWS</p>
          {/*<div className="flex flex-row ml-auto mt-1.5">*/}
          {/*  <CogIcon*/}
          {/*    id={"option_page"}*/}
          {/*    className="mr-5 ml-3 w-6 h-6 fill-gray-700 hover:ring-2 hover:ring-gray-700 hover:ring-offset-2 rounded-full dark:fill-white"/>*/}
          {/*</div>*/}
        </div>

        <div className="mx-3">
          <div className="px-4">
            <div className="pt-4 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                    <table className="min-w-full">
                      <thead className="bg-white dark:bg-gray-700">
                      <tr>
                        <th scope="col"
                            className="py-1.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 dark:text-white">
                          Country
                        </th>
                        <th scope="col"
                            className="pl-1 pr-1 py-1.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          Region
                        </th>
                        <th scope="col"
                            className="pl-1 pr-3 py-1.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          Code
                        </th>
                        <th scope="col"
                            className="pl-1 pr-3 py-1.5 text-left text-sm font-semibold text-gray-900 dark:text-white">
                          Color
                        </th>
                      </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-900">

                      {/*location name*/}
                      {locations.map((location) => (
                        <Fragment key={location.name}>
                          <tr className="border-t border-gray-200 dark:border-gray-700">
                            <th
                              colSpan={5}
                              scope="colgroup"
                              className="dark:bg-gray-800 dark:text-white bg-gray-50 px-4 py-1.5 text-left text-sm font-semibold text-gray-900 sm:px-6 text-center"
                            >
                              {location.name}
                            </th>
                          </tr>

                          {/*sub location*/}
                          {location.areas.map((area) => (
                            <tr
                              className={classNames('border-gray-300 border-t dark:border-gray-700')}
                            >
                              <td
                                className="whitespace-nowrap py-1.5 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 dark:text-white">
                                {area.country}
                              </td>
                              <td className="whitespace-nowrap pl-1 pr-3 py-1.5 text-sm text-gray-500 dark:text-white">
                                {area.region}
                              </td>
                              <td className="whitespace-nowrap pl-1 pr-3 py-1.5 text-sm text-gray-500 dark:text-white">
                                {area.code}
                              </td>
                              <td className="whitespace-nowrap pl-1 pr-3 py-1.5 text-sm text-gray-500 dark:text-white">

                                <button
                                  type="button"
                                  className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 dark:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-200 focus:ring-offset-2 text-center align-middle"
                                  style={{backgroundColor: colorPalette[area.code]}}
                                  onClick={() => {
                                    handleClick(area.code)
                                  }}
                                >
                                </button>

                                {displayColorPicker[area.code] && area.code !== "sa-east-1" ?
                                  <div className="absolute z-[2] right-4 mt-4 mr-2">
                                    <div className="fixed top-0 right-0 left-0 bottom-0" onClick={handleClose}/>
                                    <TwitterPicker color={colorPalette[area.code]}
                                                   colors={['#1a232f', '#7B1FA2', '#2E7D32', '#1565C0', '#B71C1C', '#000000', '#0097A7', '#00897B', '#9E9D24', '#880E4F']}
                                                   onChangeComplete={(color) => updateColor(area.code, color)}
                                                   triangle="top-right"/>
                                  </div>
                                  : null}

                                {displayColorPicker[area.code] && area.code === "sa-east-1" ?
                                  <div className="absolute z-[2] right-4 mr-2 top-[944px]">
                                    <div className="fixed top-0 right-0 left-0 bottom-0" onClick={handleClose}/>
                                    <TwitterPicker color={colorPalette[area.code]}
                                                   colors={['#1a232f', '#7B1FA2', '#2E7D32', '#1565C0', '#B71C1C', '#000000', '#0097A7', '#00897B', '#9E9D24', '#880E4F']}
                                                   onChangeComplete={(color) => updateColor(area.code, color)}
                                                   triangle="hide"/>
                                  </div>
                                  : null}
                              </td>
                            </tr>
                          ))}
                        </Fragment>
                      ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="mb-2 flex flex-row justify-center mt-2 mr-2 cursor-pointer underline hover:text-blue-700 text-blue-900 mt-4 dark:text-white dark:hover:text-gray-200"
            onClick={openAboutPage}>
            <p>About(Version 0.3)</p>
            <ExternalLinkIcon className="w-4 h-4 fill-blue-900 dark:fill-white ml-1.5 mt-0.5"/>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App
