const CONFIG = {
    API_KEY: 'AIzaSyBd34cP4KHFKN0WyNNiqhlQ2HSM8j2tD_E', // Replace with your actual API key
    FOLDER_IDS: {
        syllabusS2: '1qzlAm8Zi9RC11iwD2V2T0uU_8DMSlemE',
        newsletters: '14OT-O9JooQKzKxxL2bhLUUZkdB3MOSf8',
        faculty_development: '1yB9N4DKyGc3AL1EhGiPTgtpyPOlq8cvV',// New entry,


        pyq: {
            sem_1: {
                python: '1SPAJ_Azd-kVEc7l7rrerpmeQOeZJO2Xw',
                it: '1QvTM_Z80mrP7dTu9g9-dgGOdgtSzid-c',
                maths: '1xIFEVMpiB2wZvJL3KVRQKEdcecfUskLs',
                cse: '1O7ToNX0DIfhrB3K1ytSbPBxm8GhMNpqR',
                ech: '1JM5fS8mss8ViwNaO7sLpn4QF5btEX9WB',

            },
            sem_2: {
                Advance_python: '1SFSqASzR03MrKZ3neQFjxjBIhJVb6nUx',
                enginnering_maths_s2: '1TkyPmBgF9atrblZhIDwMcgKOB36FQTKN',
                Applied_maths_s2: '1P0h7Ol7a1et5I2E3hWuMb5nW1mKrpIFA',
                Modern_physics: '1KCKauTNQ8hyW-kj1sj-DPn1Zr9t_DpbC',
                enviromental_sustainability: '1_a51gVjCkEhuLYsXRjHHRqi1VTyEkvYH',

            },
            sem_3: {
                //                 1sWvegnzI20APrfIt07frmMX3ZXse4MLN ->    dbms
                //  1rKihco_dxwB9gB9xKAW96U8WaS9s8SX9 -> dsp 
                //   1Epp-_61b6_bCZfW98MBAB0wNwHTBIC48 -> edm
                //    1viHPIpIpI_PswBzAyMMS8QUAsOF1p4Vh  -> oopj
                //     1zkn4Lq-lob58TDgSb0KwSkTBN3VffS_h -> os 
                os: '1sWvegnzI20APrfIt07frmMX3ZXse4MLN',
                dbms: '1rKihco_dxwB9gB9xKAW96U8WaS9s8SX9',
                dsp: '1Epp-_61b6_bCZfW98MBAB0wNwHTBIC48',
                edm: '1viHPIpIpI_PswBzAyMMS8QUAsOF1p4Vh',
                oopj: '1zkn4Lq-lob58TDgSb0KwSkTBN3VffS_h'




            }
        },
        Notes: {
            Applied_maths: '1RI3gfrwmR-Muj8qujj2Wv_0mawZKDXxg',
            english: {
                ES: '1ZxIE4Tjnsbl_VgnLY1b_4oy0dyjdzGWR',
                MPH: '1Cv82eCraCbeyBT_NVyMxDkOG2GB--E4G',
            },
            gujarati: {
                ES: '1PQ-HRdCURvnMYp274nppNjBvPGoMQSYf',
                MPH: '1w8mJkjdhw7lHJ_qxzMeuPGpRvWFL5QdL',
            },
        }
    },


    yr_2024_2025: {
        sem3: {
            syllabs: '1Izl-nki7BKIvRyFJ_efTL18CiVKEzvyV'
        }
    },

    yr_2025_2026: {
        sem4: {
            syllabus: '1nUND77k1CXaZNv6yjDTX8PSW3-3I3iCB',
        }
    },
    PLAYLIST_IDS: {
        python: 'PL5hA7O8RI2bPOSoX7l8zZIIuDQrc9b9wO',
        advPython: 'PL5hA7O8RI2bMd6FrVKDz-VhKXNVezg_Ly',
        it: 'PLZ3xYAWT5a-nskfWOvHd_Fvh4RZsedu7G',
        networking: 'PL5hA7O8RI2bMBGjSduDQRYUCrNViAEee1',
        enginnering_maths: 'PLs6nv4Vuoj-szyhRqc8PcTFTdFzDIJrfj',
        gtu_maths_2: 'PLLfoR5ZJ0A_4ushGMb__Kvsk3ffqlrIr3',
        FSD: 'PLWPirh4EWFpG2b1L3CL-OAPYcM25jLjXH',
        // Semester 3
        digital_markteting: "PL5hA7O8RI2bMH9S_-KbY7K-73hlrAyTHF",
        // Semester 4
        object_oriented_programming_java: 'PLWKjhJtqVAbnklGh3XzZ4E8Jw9P9K2A1D', // Java Programming: Solving Problems with Software
        fundamentals_of_machine_learning: 'PLWKjhJtqVAbm3m1QXg7EoSxKXWwRg8Zpq', // Machine Learning for Beginners
        web_development_php: 'PLWKjhJtqVAbmGQoa6lN6a1xNq7kjP9B2h', // PHP Programming Language Tutorial - Full Course
        // Semester 5
        foundation_ai_ml: 'PLWKjhJtqVAbm3m1QXg7EoSxKXWwRg8Zpq', // Machine Learning for Beginners
        mobile_computing_networks: 'PLWKjhJtqVAbnupwRFOq9zGOWjdvPRtCmO', // Linux Operating System - Crash Course for Beginners
        advanced_java_programming: 'PLWKjhJtqVAbnklGh3XzZ4E8Jw9P9K2A1D', // Java Programming: Solving Problems with Software
        // Semester 6
        mobile_application_development: 'PLWKjhJtqVAbk3cFkeP2lQ6K6J9Z1nVU2q', // Android Development for Beginners - Full Course
        cyber_security_digital_forensics: 'PLWKjhJtqVAbm3m1QXg7EoSxKXWwRg8Zpq', // Cyber Security Course for Beginners
        cloud_data_center_technologies: 'PLWKjhJtqVAbm7h1x3g8Yt7k7pXT3a7V7h', // Cloud Computing Full Course
        foundation_blockchain: 'PLWKjhJtqVAbm7h1x3g8Yt7k7pXT3a7V7h', // Blockchain Full Course
        software_development: 'PLWKjhJtqVAbm7h1x3g8Yt7k7pXT3a7V7h', // Software Development Course for Beginners
        // Add other playlist IDs as needed




        // debugging:"PLVk47Sxy_0miPj7yUrffk447sDf7_NRM9",





















    }
};
window.CONFIG = {
    API_KEY: "AIzaSyBd34cP4KHFKN0WyNNiqhlQ2HSM8j2tD_E", // ✅ Ensure this key is correct
    FOLDER_IDS: {
        academic_calendar: "16a58BgCLN8h0SnGxjnYFGDdkfWqcuS49",
        certificates: "1vXU0cCwrYplFhmrGLu3MYuf1fVJeylWQ" // GPG Root folder for certificates
    }
};

