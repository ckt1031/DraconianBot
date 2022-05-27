import axios from 'axios';
import { EmbedBuilder } from 'discord.js';
import { parseStringPromise } from 'xml2js';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'weather',
    description: 'Get weather.',
    directMessageAllowed: true,
    cooldownInterval: 10 * 1000,
  },
  run: async ({ message, args }) => {
    const embed = new EmbedBuilder();

    const targetLocation = args.join(' ');

    if (!targetLocation) {
      return;
    }

    try {
      const url = 'https://weather.service.msn.com/find.aspx';

      const response = await axios.get(url, {
        params: {
          src: 'outlook',
          weadegreetype: 'C',
          culture: 'en-US',
          weasearchstr: targetLocation,
        },
        timeout: 10_000,
      });

      const responseData = response.data as string;

      if (!responseData.includes('<')) {
        if (responseData.search(/not found/i) !== -1) {
          throw 'Information cannot be found!';
        }
        throw 'Invalid body content!';
      }

      const data = await parseStringPromise(responseData);

      type CurrentWeather = {
        $: {
          temperature: string;
          skytext: string;
          date: string;
          observationtime: string;
          observationpoint: string;
          feelslike: string;
          humidity: string;
          winddisplay: string;
          day: string;
          shortday: string;
          windspeed: string;
        };
      };

      interface WeatherData {
        $: {
          weatherlocationname: string;
          timezone: string;
          url: string;
          imagerelativeurl: string;
          degreetype: string;
          entityid: string;
        };
        current: CurrentWeather[];
      }

      const weatherData: WeatherData = data.weatherdata.weather[0];

      embed
        .setTitle(`${weatherData.$.weatherlocationname}'s Current Weather:`)
        .setDescription(`More Information: [HERE](${weatherData.$.url})`)
        .setFooter({
          text: `ID: ${weatherData.$.entityid}`,
        })
        .addFields([
          {
            name: 'Date',
            value: `${weatherData.current[0].$.date} (${weatherData.current[0].$.day})`,
            inline: false,
          },
          {
            name: 'Time Zone',
            value: `UTC${
              weatherData.$.timezone.startsWith('-')
                ? weatherData.$.timezone
                : '+' + weatherData.$.timezone
            }`,
            inline: true,
          },

          {
            name: 'Status',
            value: weatherData.current[0].$.skytext,
            inline: true,
          },
          {
            name: 'Temperature',
            value: weatherData.current[0].$.temperature + '°C',
            inline: true,
          },
          {
            name: 'Feels like',
            value: weatherData.current[0].$.feelslike + '°C',
            inline: true,
          },
          {
            name: 'Humidity',
            value: weatherData.current[0].$.humidity,
            inline: true,
          },
          {
            name: 'Windspeed',
            value: weatherData.current[0].$.winddisplay,
            inline: true,
          },
        ]);

      message.reply({
        embeds: [embed],
      });
    } catch (error) {
      if (error instanceof Error) {
        embed.setTitle(error.message);

        message.reply({
          embeds: [embed],
        });
      }
    }
  },
};
